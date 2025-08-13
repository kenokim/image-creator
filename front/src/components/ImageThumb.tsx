import { Card } from "@/components/ui/card";
import useLongPress from "@/hooks/use-long-press";

export interface ImageThumbProps {
  url: string;
  active: boolean;
  onToggle: (url: string) => void;
  onLongPress: (url: string) => void;
  className?: string;
}

const ImageThumb = ({ url, active, onToggle, onLongPress, className }: ImageThumbProps) => {
  const lp = useLongPress(() => onLongPress(url));
  return (
    <Card
      className={`overflow-hidden relative group cursor-pointer select-none ${active ? "ring-2 ring-brand" : "hover:ring-1 hover:ring-accent"} ${className ?? ""}`}
      onClick={() => onToggle(url)}
      onMouseDown={lp.onMouseDown}
      onMouseUp={lp.onMouseUp}
      onMouseLeave={lp.onMouseLeave}
      onTouchStart={lp.onTouchStart}
      onTouchEnd={lp.onTouchEnd}
      aria-pressed={active}
    >
      <img src={url} alt="생성 이미지" loading="lazy" className="w-full h-40 object-cover" />
      <div className={`absolute inset-0 transition ${active ? "bg-brand/10" : "group-hover:bg-foreground/5"}`} />
    </Card>
  );
};

export default ImageThumb;


