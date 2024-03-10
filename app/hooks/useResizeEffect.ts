import { useEffect } from "react";

const useResizeEffect = (callback: () => void) => {
  useEffect(() => {
    const handleResize = () => {
      try {
        callback();
      } catch (e) {
        if (e instanceof Error) {
          console.error(
            `useResizeEffect: ${e.name} when executing callback: ${e.message}`,
            e
          );
        } else {
          console.error(
            `useResizeEffect: Unhandled exception when executing callback:`,
            e
          );
        }
      }
    };

    if (typeof window === "undefined" || !window) {
      console.warn(
        "useResizeEffect: Window is null, not adding event listener"
      );
      return;
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      if (typeof window === "undefined" || !window) {
        console.warn(
          "useResizeEffect: Window is null, not removing event listener"
        );
        return;
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);
};

export default useResizeEffect;
