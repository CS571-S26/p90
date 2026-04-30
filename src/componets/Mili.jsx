import { motion } from "framer-motion";
import RevealText from "./RevealText";

const style = {

    panel: {
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    bg: {
        position: "absolute",
        inset: 0,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: "scale(1.1)",
        willChange: "transform",
    },


    overlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
    },

    content: {
        position: "relative",
        zIndex: 2,
        color: "white",
        textAlign: "center",
    },

    title: {
        color: "#ffff",
        fontSize: "4rem",
        letterSpacing: "4px",
        fontWeight: 300,
        fontFamily: "arno-pro",
    },

    container: {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.08 },
        },
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

export default function Mili() {
    const words = "M i l i".split(" ");
    return (
        <section className="panel" style={style.panel}>
            <div
                className="bg"
                style={{
                    ...style.bg,
                    backgroundImage: `url("/p90/covers/Mag%20Mell.jpg")`,
                }}
            />
            <div style={style.overlay} />

            <motion.div
                variants={style.container}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.6, margin: "-20% 0px -20% 0px" }}
            >
                <h1 style={style.title}>
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={child}
                            style={{ display: "inline-block", marginRight: 6 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>
            </motion.div>
            {/* <motion.div
                // variants={style.container}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.6, margin: "-20% 0px -20% 0px" }}
                style={style.content}
            >
                {words.map((word, i) => (
                    <motion.span key={i} variants={child}>
                        {word}
                    </motion.span>
                ))}
            </motion.div> */}
            {/* <div style={style.content}>
                <h1 style={style.title}>Listen Now</h1>
                <RevealText text="M i l i" style={style.content} />
            </div> */}

        </section>
    );
}