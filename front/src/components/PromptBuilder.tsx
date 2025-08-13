import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface PromptBuilderProps {
  useRaw: boolean;
  rawPrompt: string;
  scene: string;
  action: string;
  onChange: (values: { useRaw: boolean; rawPrompt: string; scene: string; action: string }) => void;
}

const PromptBuilder = ({ useRaw, rawPrompt, scene, action, onChange }: PromptBuilderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="use-raw" className="text-sm">고급 프롬프트 모드</Label>
        <Switch id="use-raw" checked={useRaw} onCheckedChange={(v) => onChange({ useRaw: v, rawPrompt, scene, action })} />
      </div>

      {useRaw ? (
        <div>
          <label className="block text-sm font-medium mb-1">프롬프트</label>
          <textarea
            className="w-full min-h-28 rounded-md border bg-background p-3 text-sm"
            placeholder="원하는 프롬프트를 자유롭게 입력하세요"
            value={rawPrompt}
            onChange={(e) => onChange({ useRaw, rawPrompt: e.target.value, scene, action })}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">장면 (선택)</label>
            <input
              className="w-full h-10 rounded-md border bg-background px-3 text-sm"
              placeholder="예: 해변가 석양, 부드러운 조명"
              value={scene}
              onChange={(e) => onChange({ useRaw, rawPrompt, scene: e.target.value, action })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">동작 (선택)</label>
            <input
              className="w-full h-10 rounded-md border bg-background px-3 text-sm"
              placeholder="예: 역동적으로 점프, 미소 짓는 모습"
              value={action}
              onChange={(e) => onChange({ useRaw, rawPrompt, scene, action: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptBuilder;
