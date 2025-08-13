import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface SavedPanelProps {
  saved: string[];
  onRemove: (url: string) => void;
  onClear: () => void;
  onDownload: () => void;
  history?: string[];
}

const SavedPanel = ({ saved, onRemove, onClear, onDownload, history = [] }: SavedPanelProps) => {
  return (
    <aside className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">남김 목록 ({saved.length})</h2>
        <div className="flex gap-2">
          <Button variant="soft" size="sm" onClick={onClear} disabled={saved.length === 0}>비우기</Button>
          <Button variant="hero" size="sm" onClick={onDownload} disabled={saved.length === 0}>저장하기</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {saved.map((url, i) => (
          <Card key={url + i} className="overflow-hidden group relative">
            <img src={url} alt={`저장된 이미지 ${i + 1}`} loading="lazy" className="w-full h-28 object-cover" />
            <button
              className="absolute top-2 right-2 text-xs rounded-md bg-background/80 px-2 py-1 border hover:bg-background"
              onClick={() => onRemove(url)}
              aria-label="제거"
            >
              제거
            </button>
          </Card>
        ))}
      </div>

      {history.length > 0 && (
        <div className="pt-4 space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">과거 생성된 이미지 ({history.length})</h3>
          <div className="grid grid-cols-3 gap-2">
            {history.map((url, i) => (
              <Card key={`hist-${i}-${url}`} className="overflow-hidden">
                <img src={url} alt={`과거 생성 이미지 ${i + 1}`} loading="lazy" className="w-full h-20 object-cover" />
              </Card>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default SavedPanel;
