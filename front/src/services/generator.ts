export type Provider = "demo" | "imagen4";

export interface GenerateOptions {
  prompt: string; // leave empty to let server build from parts
  count?: number;
  scene?: string;
  action?: string;
  anchorUrl?: string;
  characterDna?: string;
}

export interface GeneratorAPI {
  generateImages(opts: GenerateOptions): Promise<string[]>;
  generateAnchor(prompt: string): Promise<string>;
  listAnchors(): Promise<string[]>;
  listHistory(): Promise<string[]>;
  saveHistory(images: string[], anchorUrl?: string): Promise<string[]>;
}

const randomSeed = () => Math.random().toString(36).slice(2);

class DemoGenerator implements GeneratorAPI {
  async generateImages({ count = 4 }: GenerateOptions): Promise<string[]> {
    return Array.from({ length: count }).map(() =>
      `https://picsum.photos/seed/${randomSeed()}/1024/1024.webp`
    );
  }
  async generateAnchor(_prompt: string): Promise<string> {
    return `https://picsum.photos/seed/anchor-${randomSeed()}/1024/1024.webp`;
  }
  async listAnchors(): Promise<string[]> {
    return Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/seed/anchor-seed-${i}/600/600.webp`);
  }
  async listHistory(): Promise<string[]> {
    return [];
  }
  async saveHistory(images: string[]): Promise<string[]> {
    return images;
  }
}

class Imagen4Generator implements GeneratorAPI {
  private apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8787";

  async generateImages({ prompt, count = 4, scene, action, anchorUrl, characterDna }: GenerateOptions): Promise<string[]> {
    const body: any = { count };
    if (prompt !== undefined) body.prompt = prompt;
    if (scene !== undefined) body.scene = scene;
    if (action !== undefined) body.action = action;
    if (anchorUrl !== undefined) body.anchorUrl = anchorUrl;
    if (characterDna !== undefined) body.characterDna = characterDna;
    const res = await fetch(`${this.apiBase}/functions/v1/imagen4-generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `이미지 생성 실패 (HTTP ${res.status})`);
    }
    const data = (await res.json()) as { images: string[] };
    return data.images;
  }

  async generateAnchor(prompt: string): Promise<string> {
    const res = await fetch(`${this.apiBase}/api/anchors/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `앵커 생성 실패 (HTTP ${res.status})`);
    }
    const data = (await res.json()) as { url: string };
    return data.url;
  }

  async listAnchors(): Promise<string[]> {
    const res = await fetch(`${this.apiBase}/api/anchors`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `앵커 목록 조회 실패 (HTTP ${res.status})`);
    }
    const data = (await res.json()) as { anchors: string[] };
    return data.anchors;
  }

  async listHistory(): Promise<string[]> {
    const res = await fetch(`${this.apiBase}/api/history`);
    if (!res.ok) throw new Error(`히스토리 조회 실패 (HTTP ${res.status})`);
    const data = (await res.json()) as { items: { url: string }[] };
    return data.items.map((i) => i.url);
  }

  async saveHistory(images: string[], anchorUrl?: string): Promise<string[]> {
    const res = await fetch(`${this.apiBase}/api/history/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images, anchorUrl }),
    });
    if (!res.ok) throw new Error(`히스토리 저장 실패 (HTTP ${res.status})`);
    const data = (await res.json()) as { saved: { url: string }[] };
    return data.saved.map((s) => s.url);
  }
}

export const createGenerator = (provider: Provider): GeneratorAPI => {
  if (provider === "imagen4") return new Imagen4Generator();
  return new DemoGenerator();
};

export const buildPrompt = (params: {
  useRaw: boolean;
  rawPrompt: string;
  scene: string;
  action: string;
}) => {
  if (params.useRaw && params.rawPrompt.trim().length > 0) return params.rawPrompt;
  const bits: string[] = [];
  if (params.scene) bits.push(`Scene: ${params.scene}`);
  if (params.action) bits.push(`Action: ${params.action}`);
  return bits.join(", ");
};
