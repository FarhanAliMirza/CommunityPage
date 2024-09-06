"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  transform,
  animate,
} from "framer-motion";

interface IndexProps {
  stickyElement: React.RefObject<HTMLElement>;
}

export default function Cursor({ stickyElement }: IndexProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorSize = isHovered ? 60 : 15;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  // Smooth out the mouse values
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x);
    if (cursor.current) {
      animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
    }
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    if (!stickyElement.current) return;

    const { left, top, height, width } =
      stickyElement.current.getBoundingClientRect();

    // Center position of the stickyElement
    const center = { x: left + width / 2, y: top + height / 2 };

    if (isHovered) {
      // Distance between the mouse pointer and the center of the custom cursor
      const distance = { x: clientX - center.x, y: clientY - center.y };

      // Rotate
      rotate(distance);

      // Stretch based on the distance
      const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
      const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
      const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
      scale.x.set(newScaleX);
      scale.y.set(newScaleY);

      // Move mouse to center of stickyElement + slightly move it towards the mouse pointer
      mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    } else {
      // Move custom cursor to center of stickyElement
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  };

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);
    if (cursor.current) {
      animate(
        cursor.current,
        { scaleX: 1, scaleY: 1 },
        { duration: 0.1, type: "spring" }
      );
    }
  };

  useEffect(() => {
    const currentElement = stickyElement.current;
    if (!currentElement) return;

    currentElement.addEventListener("mouseenter", manageMouseOver);
    currentElement.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      currentElement.removeEventListener("mouseenter", manageMouseOver);
      currentElement.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [stickyElement, isHovered]);

  const template = ({
    rotate,
    scaleX,
    scaleY,
  }: {
    rotate: string;
    scaleX: number;
    scaleY: number;
  }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <div className="hidden md:block">
      <motion.div
        transformTemplate={template}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          scaleX: scale.x,
          scaleY: scale.y,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        className="fixed w-15 h-15 z-50 pointer-events-none bg-black dark:bg-white rounded-full"
        ref={cursor}
      ></motion.div>
    </div>
  );
}
