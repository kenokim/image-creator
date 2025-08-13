import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { buildImagen4Prompt } from './prompts.js';
import { GoogleGenAI } from '@google/genai';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

// Load anchors from JSON and expose helper to build absolute URLs
type AnchorRecord = { id: string; ['character-dna']: string; image: string };
const anchorsFile = path.join(__dirname, '..', 'data', 'anchors.json');
const loadAnchors = (): AnchorRecord[] => {
  try {
    const raw = fs.readFileSync(anchorsFile, 'utf-8');
    return JSON.parse(raw) as AnchorRecord[];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load anchors.json; falling back to empty list.', err);
    return [];
  }
};

const toAbsoluteDataUrl = (req: express.Request, relative: string): string => {
  const base = `${req.protocol}://${req.get('host')}`;
  if (relative.startsWith('/')) return `${base}${relative}`;
  return `${base}/${relative}`;
};

// History persistence
type HistoryItem = { id: string; anchorId: string; path: string; createdAt: string };
const historyFile = path.join(__dirname, '..', 'data', 'history.json');

const readHistory = (): HistoryItem[] => {
  try {
    const raw = fs.readFileSync(historyFile, 'utf-8');
    const text = raw && raw.trim().length > 0 ? raw : '[]';
    return JSON.parse(text) as HistoryItem[];
  } catch {
    return [];
  }
};

const writeHistory = (items: HistoryItem[]) => {
  fs.writeFileSync(historyFile, JSON.stringify(items, null, 2), 'utf-8');
};

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const resolveAnchorIdFromUrl = (req: express.Request, anchorUrl?: string): string => {
  if (!anchorUrl) return 'misc';
  for (const a of loadAnchors()) {
    const abs = toAbsoluteDataUrl(req, a.image);
    if (abs === anchorUrl) return a.id;
  }
  // Try to parse /data/images/<id> or /data/anchors/<id>
  const m1 = anchorUrl.match(/\/data\/images\/([^\/]+)/);
  const m2 = anchorUrl.match(/\/data\/anchors\/([^\/.]+)/);
  return m1?.[1] ?? m2?.[1] ?? 'misc';
};

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// List anchor images (mapped to absolute /data URLs)
app.get('/api/anchors', (req, res) => {
  const urls = loadAnchors().map((a) => toAbsoluteDataUrl(req, a.image));
  res.json({ anchors: urls });
});

// Generate and store a new anchor (demo: random picsum). Body: { prompt: string }
app.post('/api/anchors/generate', (req, res) => {
  const schema = z.object({ prompt: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid body' });
  const seed = Math.random().toString(36).slice(2);
  const url = `https://picsum.photos/seed/anchor-${seed}/1024/1024.webp`;
  res.json({ url });
});

// List saved history
app.get('/api/history', (req, res) => {
  const items = readHistory().map((it) => ({
    id: it.id,
    anchorId: it.anchorId,
    url: toAbsoluteDataUrl(req, it.path),
    createdAt: it.createdAt,
  }));
  res.json({ items });
});

// Save selected images into history
// Body: { images: string[], anchorUrl?: string, anchorId?: string }
app.post('/api/history/save', async (req, res) => {
  const schema = z.object({
    images: z.array(z.string().url()).min(1),
    anchorUrl: z.string().url().optional(),
    anchorId: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid body' });
  const { images, anchorUrl, anchorId } = parsed.data;
  const finalAnchorId = anchorId || resolveAnchorIdFromUrl(req, anchorUrl);

  const baseDir = path.join(__dirname, '..', 'data', 'images', finalAnchorId);
  ensureDir(baseDir);

  const saved: HistoryItem[] = [];
  for (const src of images) {
    const id = Math.random().toString(36).slice(2);
    const filename = `${Date.now()}-${id}.png`;
    const destPath = path.join(baseDir, filename);
    // Download and write
    try {
      if (src.startsWith('data:')) {
        const [meta, b64] = src.split(',');
        const buf = Buffer.from(b64, 'base64');
        fs.writeFileSync(destPath, buf);
      } else {
        const resp = await fetch(src);
        if (!resp.ok) throw new Error(`Download failed ${resp.status}`);
        const arrayBuf = await resp.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(arrayBuf));
      }
      const relPath = path.relative(path.join(__dirname, '..'), destPath).replace(/\\/g, '/');
      saved.push({ id, anchorId: finalAnchorId, path: relPath, createdAt: new Date().toISOString() });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save image to history', err);
    }
  }

  if (saved.length > 0) {
    const current = readHistory();
    writeHistory([...saved, ...current]);
  }

  res.json({ saved: saved.map((s) => ({ id: s.id, url: toAbsoluteDataUrl(req, s.path) })) });
});

// Call Google Images API (Imagen 4). Returns array of data URLs or direct links.
async function generateWithImagen4(promptText: string, count: number): Promise<string[]> {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('GOOGLE_API_KEY not configured');

  const ai = new GoogleGenAI({ apiKey: key });
  // 모델명은 문서 예시를 따르되, 향후 변경 시 환경변수로 분리 가능
  const model = 'imagen-4.0-generate-preview-06-06';
  try {
    const preview = promptText;
    console.log(`[imagen] generateImages model=${model} count=${count} prompt=\n${preview}`);
  } catch {}
  const response: any = await ai.models.generateImages({
    model,
    prompt: promptText,
    config: {
      numberOfImages: Math.min(Math.max(count, 1), 4),
      aspectRatio: '1:1',
    },
  });

  const results: string[] = [];
  const generated = response?.generatedImages || [];
  for (const img of generated) {
    const bytes = img?.image?.imageBytes;
    const mime = 'image/png';
    if (bytes) results.push(`data:${mime};base64,${bytes}`);
  }
  if (results.length === 0) throw new Error('No images returned from Imagen client');
  return results;
}

// Imagen4-compatible endpoint used by the frontend.
// Accepts either a ready "prompt" or builds from characterDna+scene+action.
// If characterDna is empty and anchorUrl is provided, server injects the DNA
// from anchors.json by matching the anchor.
// Empty/missing fields are coerced to empty strings ("").
// POST /functions/v1/imagen4-generate
// Body: { prompt?: string, characterDna?: string, scene?: string, action?: string, anchorUrl?: string, count?: number }
app.post('/functions/v1/imagen4-generate', async (req, res) => {
  const schema = z.object({
    prompt: z.string().optional(),
    characterDna: z.string().optional(),
    scene: z.string().optional(),
    action: z.string().optional(),
    anchorUrl: z.string().url().optional(),
    count: z.number().int().min(1).max(8).optional(),
  });
  console.log(req.body);
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid body' });
  let { prompt, characterDna, scene, action, anchorUrl } = parsed.data as any;
  const count = Math.max(1, Math.min(parsed.data.count ?? 4, 4));

  // If DNA is empty, try to pull from selected anchor
  if (!characterDna || characterDna.trim().length === 0) {
    const id = resolveAnchorIdFromUrl(req, anchorUrl);
    const found = loadAnchors().find((a) => a.id === id);
    if (found) characterDna = found['character-dna'];
  }

  const dna = (characterDna ?? '').trim();
  const sc = (scene ?? '').trim();
  const ac = (action ?? '').trim();
  const ready = (prompt ?? '').trim();

  console.log(dna, sc, ac, ready);

  const finalPrompt = ready.length > 0 ? ready : buildImagen4Prompt({ characterDna: dna, scene: sc, action: ac });

  console.log(finalPrompt);

  try {
    const images = await generateWithImagen4(finalPrompt, count);
    res.json({ images });
  } catch (err: any) {
    // Fallback to demo images on error
    const images = Array.from({ length: count }).map(() => `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/1024/1024.webp`);
    res.json({ images, warning: err?.message || String(err) });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});


