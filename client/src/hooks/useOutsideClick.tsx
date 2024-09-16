import { useEffect, RefObject } from "react";

const useOnClickOutside = (
  isOpen: boolean | number | null,
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
        handler(event); // Call the handler with the event
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;