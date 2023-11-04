import { useState, useEffect } from "react";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    // Add event listener to the window
    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      // Clean up by removing the event listener
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]); // Make sure to include scrollDirection in the dependency array

  return scrollDirection;
}

export default useScrollDirection;
