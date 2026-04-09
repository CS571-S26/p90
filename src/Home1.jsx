import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  { title: "Mili", image: "/p90/covers/Mag Mell.jpg" },
  { title: "Scroll", image: "/p90/covers/Miracle Milk.jpg" },
  { title: "Explore", image: "/p90/covers/Millennium Mother.jpg" },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const yOffset = useTransform(scrollY, [0, 1000], [0, -30]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {sections.map((section, i) => (
        <section
          key={i}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            position: "relative",
          }}
        >
          {/* Background tied to section */}
          <motion.div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              width: "100%",
              overflow: "hidden",
              zIndex: 0,
            }}
          >
            <motion.img
              src={section.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(70%) grayscale(10%)",
                y: yOffset,
              }}
            />

            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            />
          </motion.div>

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: i === 0 ? "4rem" : "1.5rem",
              zIndex: 2,
              textAlign: "center",
            }}
          >
            {section.title}
          </div>
        </section>
      ))}
    </div>
  );
}