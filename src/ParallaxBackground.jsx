import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground({ image }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // Subtle zoom (premium feel)
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <motion.img
        src={image}
        style={{
          width: "100%",
          height: "120%",
          objectFit: "cover",
          y,
          scale,
          filter: "brightness(70%) grayscale(10%)",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}