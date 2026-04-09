import RevealText from "./RevealText";
import ParallaxBackground from "./ParallaxBackground";

const sections = [
  { title: "Mili", image: "/p90/covers/Mag Mell.jpg" },
  { title: "Scroll", image: "/p90/covers/Miracle Milk.jpg" },
  { title: "Explore", image: "/p90/covers/Millennium Mother.jpg" },
];

export default function Home() {
  return (
    <div
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
          {/* Parallax Background */}
          <ParallaxBackground image={section.image} />

          {/* Center Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <RevealText text={section.title} large={i === 0} />
          </div>
        </section>
      ))}
    </div>
  );
}