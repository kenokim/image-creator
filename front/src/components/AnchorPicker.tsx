import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface AnchorPickerProps {
  anchors: string[];
  selected?: string | null;
  onSelect: (url: string) => void;
  onGenerate: (prompt: string) => Promise<void>;
}

const AnchorPicker = ({ anchors, selected, onSelect, onGenerate }: AnchorPickerProps) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      await onGenerate(prompt.trim());
      setPrompt("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">앵커 이미지 프롬프트 (선택)</label>
        <div className="flex gap-2">
          <input
            className="flex-1 h-10 rounded-md border bg-background px-3 text-sm"
            placeholder="예: 스튜디오 조명, 시네마틱 톤"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button variant="soft" onClick={submit} disabled aria-disabled title="현재 비활성화됨">{loading ? "생성중..." : "앵커 생성"}</Button>
        </div>
      </div>

      <ScrollArea className="h-[320px] rounded-md border">
        <div className="grid grid-cols-3 gap-2 p-2">
          {anchors.map((url, i) => {
            const active = url === selected;
            return (
              <Card
                key={url + i}
                className={`overflow-hidden cursor-pointer transition ${(active ? "ring-2 ring-brand" : "hover:ring-1 hover:ring-accent")}`}
                onClick={() => onSelect(url)}
              >
                <img src={url} alt={`앵커 이미지 ${i + 1}`} loading="lazy" className="w-full h-24 object-cover" />
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AnchorPicker;
