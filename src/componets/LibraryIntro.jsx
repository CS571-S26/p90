import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
    "Open the Curtain",
    "Light Up",
    "Don't miss a moment of this experiment",
];

export default function LibraryIntro({ onFinish }) {
    const [lineIndex, setLineIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [phase, setPhase] = useState("intro"); // intro → exit

    const currentLine = lines[lineIndex]?.split(" ") || [];

    useEffect(() => {
        if (phase === "exit") return;

        // still typing current line
        if (wordIndex < currentLine.length) {
            const t = setTimeout(() => {
                setWordIndex((w) => w + 1);
            }, 250); // speed per word

            return () => clearTimeout(t);
        }

        // move to next line
        const t = setTimeout(() => {
            if (lineIndex < lines.length - 1) {
                setLineIndex((l) => l + 1);
                setWordIndex(0);
            } else {
                // finished all lines → exit
                setPhase("exit");

                setTimeout(() => {
                    onFinish?.();
                }, 1200);
            }
        }, 600); // pause between lines

        return () => clearTimeout(t);
    }, [wordIndex, lineIndex, currentLine.length, phase, onFinish]);

    const isExit = phase === "exit";

    return (
        <motion.div
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Alice",
                gap: "12px",
                color: isExit ? "#000" : "#fff",
                zIndex: 9999,
            }}
        >
            {/* background */}
            <motion.div
                animate={{
                    backgroundColor: isExit ? "#ffffff" : "#000000",
                }}
                transition={{ duration: 1 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -1,
                }}
            />

            {/* LINES */}
            {lines.slice(0, lineIndex + 1).map((line, i) => {
                const words = line.split(" ");

                return (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            gap: "8px",
                            fontSize: "28px",
                            letterSpacing: "2px",
                        }}
                    >
                        {words.map((word, j) => {
                            const isVisible =
                                i < lineIndex ||
                                (i === lineIndex && j < wordIndex);

                            return (
                                <motion.span
                                    key={j}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={
                                        isVisible
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </div>
                );
            })}
        </motion.div>
    );
}