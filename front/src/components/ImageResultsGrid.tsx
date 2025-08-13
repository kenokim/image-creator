import { useState } from "react";
import Lightbox from "@/components/ui/lightbox";
import ImageThumb from "@/components/ImageThumb";

export interface ImageResultsGridProps {
  images: string[];
  selected: Set<string>;
  onToggle: (url: string) => void;
}

const ImageResultsGrid = ({ images, selected, onToggle }: ImageResultsGridProps) => {
  if (images.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        아직 생성된 이미지가 없습니다. 프롬프트를 입력하고 "이미지 생성"을 눌러보세요.
      </div>
    );
  }

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((url, i) => (
        <ImageThumb
          key={url + i}
          url={url}
          active={selected.has(url)}
          onToggle={onToggle}
          onLongPress={(u) => setPreview(u)}
        />
      ))}
    </div>
    <Lightbox src={preview} onClose={() => setPreview(null)} />
    </>
  );
};

export default ImageResultsGrid;
