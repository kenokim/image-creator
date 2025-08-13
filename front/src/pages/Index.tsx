import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnchorPicker from "@/components/AnchorPicker";
import PromptBuilder from "@/components/PromptBuilder";
import ImageResultsGrid from "@/components/ImageResultsGrid";
import SavedPanel from "@/components/SavedPanel";
import { createGenerator, buildPrompt, Provider } from "@/services/generator";
import { downloadImagesAsZip } from "@/lib/download";
import { toast } from "sonner";

const Index = () => {
  // Default to imagen4 mode to use local API when available
  const [provider, setProvider] = useState<Provider>("imagen4");
  const generator = useMemo(() => createGenerator(provider), [provider]);

  // Anchor images
  const [anchors, setAnchors] = useState<string[]>([]);
  const [anchor, setAnchor] = useState<string | null>(anchors[0] ?? null);

  // Prompt builder state
  const [useRaw, setUseRaw] = useState(false);
  const [rawPrompt, setRawPrompt] = useState("");
  const [scene, setScene] = useState("");
  const [action, setAction] = useState("");

  // Generation results & selection
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const composed = buildPrompt({ useRaw, rawPrompt, scene, action });

  // Load anchors from server when provider is imagen4
  useEffect(() => {
    (async () => {
      if (provider !== "imagen4") return;
      try {
        const list = await generator.listAnchors();
        setAnchors(list);
        setAnchor(list[0] ?? null);
        const hist = await generator.listHistory();
        setHistory(hist);
      } catch (e) {
        // ignore
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const onGenerate = async () => {
    setBusy(true);
    try {
      const urls = await generator.generateImages({
        // 서버에서 DNA 기반으로 조합하도록: raw 모드가 아닐 땐 prompt 비움
        prompt: useRaw ? composed : "",
        count: 4,
        // pass parts so server can build DNA-based prompt when prompt is empty
        scene,
        action,
        anchorUrl: anchor ?? undefined,
      });
      setImages(urls);
      setHistory((prev) => [...urls, ...prev].slice(0, 120));
      setSelected(new Set());
    } catch (e: any) {
      toast.error(e.message || "이미지 생성 실패");
    } finally {
      setBusy(false);
    }
  };


  const onKeep = async () => {
    if (selected.size === 0) return;
    const toAdd = images.filter((u) => selected.has(u));
    setSaved((prev) => [...prev, ...toAdd]);
    setSelected(new Set());
    toast.success(`${toAdd.length}장을 남김 목록에 추가했습니다.`);
    // Persist to server history under current anchor
    try {
      const savedUrls = await generator.saveHistory(toAdd, anchor ?? undefined);
      setHistory((prev) => [...savedUrls, ...prev]);
    } catch (e) {
      // ignore persistence failure but keep local saved list
    }
  };

  const onDownload = async () => {
    if (saved.length === 0) return;
    await downloadImagesAsZip(saved, "generated-images.zip");
  };

  const toggleSelect = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url); else next.add(url);
      return next;
    });
  };

  const generateAnchor = async (prompt: string) => {
    try {
      const url = await generator.generateAnchor(prompt);
      setAnchors((prev) => [url, ...prev]);
      setAnchor(url);
      toast.success("앵커 이미지를 생성했습니다.");
    } catch (e: any) {
      toast.error(e.message || "앵커 이미지 생성 실패");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Imagen4 이미지 생성 스튜디오</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">모드</span>
            <Button variant={provider === "demo" ? "hero" : "soft"} size="sm" onClick={() => setProvider("demo")}>데모</Button>
            <Button variant={provider === "imagen4" ? "hero" : "soft"} size="sm" onClick={() => setProvider("imagen4")}>Imagen4</Button>
          </div>
        </div>
      </header>

      <main className="container py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Anchor preview */}
        <section className="lg:col-span-3 space-y-4">
          <div>
            <h2 className="text-base font-semibold mb-2">앵커 미리보기</h2>
            <Card className="relative overflow-hidden">
              <div className="absolute -inset-10 opacity-40 blur-3xl bg-gradient-primary" aria-hidden />
              {anchor ? (
                <img src={anchor} alt="선택된 앵커 이미지" className="relative w-full h-64 object-cover" />
              ) : (
                <div className="relative flex items-center justify-center h-64 text-muted-foreground">앵커를 선택하거나 생성하세요</div>
              )}
            </Card>
          </div>

          <AnchorPicker
            anchors={anchors}
            selected={anchor}
            onSelect={setAnchor}
            onGenerate={generateAnchor}
          />
        </section>

        {/* Middle: Prompts & actions */}
        <section className="lg:col-span-6 space-y-4">
          <Card className="p-4">
            <PromptBuilder
              useRaw={useRaw}
              rawPrompt={rawPrompt}
              scene={scene}
              action={action}
              onChange={({ useRaw: ur, rawPrompt: rp, scene: sc, action: ac }) => {
                setUseRaw(ur); setRawPrompt(rp); setScene(sc); setAction(ac);
              }}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="hero" onClick={onGenerate} disabled={busy}>{busy ? "생성중..." : "이미지 생성"}</Button>
              {/* 재생성 버튼 제거 */}
              <Button variant="soft" onClick={onKeep} disabled={selected.size === 0}>남기기</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">* 생성된 이미지를 길게 누르면 크게 볼 수 있어요.</p>
          </Card>

          <ImageResultsGrid images={images} selected={selected} onToggle={toggleSelect} />
        </section>

        {/* Right: Saved panel */}
        <section className="lg:col-span-3">
          <SavedPanel
            saved={saved}
            onRemove={(url) => setSaved((prev) => prev.filter((u) => u !== url))}
            onClear={() => setSaved([])}
            onDownload={onDownload}
            history={history}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
