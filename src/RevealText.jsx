
import { motion } from "framer-motion";

export default function RevealText({ text, large }) {
  const words = text.split(" ");

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.6, margin: "-20% 0px -20% 0px" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.4em",
        fontSize: large ? "4rem" : "1.5rem",
        color: "white",
        textAlign: "center",
      }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}