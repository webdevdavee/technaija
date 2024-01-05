"use client";

import { useState, useEffect } from "react";

export const useScrollHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const scrollThreshold = 100; // Adjust this threshold as needed

      // Check if the scroll height has reached the threshold
      setIsScrolled(scrollHeight > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled };
};
