import { useEffect } from "react";

export interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

const Lightbox = ({ src, onClose }: LightboxProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!src) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={onClose}>
      <img src={src} alt="preview" className="max-w-[92vw] max-h-[90vh] object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

export default Lightbox;


