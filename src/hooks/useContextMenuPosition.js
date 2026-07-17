import { useEffect, useState } from "react";

const useContextMenuPosition = (ref, anchorPosition, isOpen) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!ref.current || !anchorPosition || !isOpen) return;

    const rect = ref.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = anchorPosition.y;
    let left = anchorPosition.x;

    // Flip horizontally
    if (left + rect.width > viewportWidth) {
      left = anchorPosition.x - rect.width;
    }

    // Flip vertically
    if (top + rect.height > viewportHeight) {
      top = anchorPosition.y - rect.height;
    }

    // Safety padding
    top = Math.max(10, top);
    left = Math.max(10, left);

    setPosition({ top, left });
  }, [anchorPosition, isOpen, ref]);

  return position;
};

export default useContextMenuPosition;
