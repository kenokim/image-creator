import { useRef } from "react";

export interface LongPressHandlers {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export const useLongPress = (onLongPress: () => void, delayMs = 500): LongPressHandlers => {
  const timer = useRef<number | null>(null);

  const start = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      onLongPress();
      timer.current = null;
    }, delayMs);
  };

  const clear = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};

export default useLongPress;


