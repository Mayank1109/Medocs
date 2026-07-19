import { useEffect, useState } from "react";

const useContextMenuPosition = (ref, anchorRect, isOpen) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!ref.current || !anchorRect || !isOpen) return;

    function calculate() {
      const rect = ref.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const GAP = 6;

      let top = anchorRect.bottom + GAP;
      let left = anchorRect.right - rect.width;

      if (top + rect.height > viewportHeight) {
        top = anchorRect.top - rect.height - GAP;
      }

      left = Math.min(left, viewportWidth - rect.width - 10);
      left = Math.max(10, left);
      top = Math.max(10, top);

      setPosition({ top, left });
    }

    calculate();
    window.addEventListener("resize", calculate);
    window.addEventListener("scroll", calculate, true);
    return () => {
      window.removeEventListener("resize", calculate);
      window.removeEventListener("scroll", calculate, true);
    };
  }, [anchorRect, isOpen, ref]);

  return position;
};

export default useContextMenuPosition;
