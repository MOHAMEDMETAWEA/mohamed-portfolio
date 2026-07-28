"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a"
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-500/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%",
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
    />
  );
}
