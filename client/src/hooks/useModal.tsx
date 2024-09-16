import { useRef, useState } from "react";

const useModal = () => {

    const [isShowing, setIsShowing] = useState(false);
    const ref = useRef()

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    setIsShowing,
    toggle,
    ref
  };
};

export default useModal;
