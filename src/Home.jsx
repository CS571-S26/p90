import React, { useEffect, useRef } from "react";
import RevealText from "./RevealText";

export default function Home() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const sections = document.querySelectorAll(".panel");
                    const speed = 0.35;

                    sections.forEach((section) => {
                        const offsetTop = section.offsetTop;
                        const yPos = (scrollY - offsetTop) * speed;

                        const bg = section.querySelector(".bg");
                        const video = section.querySelector("video");

                        if (bg) bg.style.transform = `translateY(${yPos}px) scale(1.1)`;
                        if (video) video.style.transform = `translateY(${yPos}px) scale(1.1)`;
                    });

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initial

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} style={style.app}>

            <Section
                id="listen"
                title="LISTEN NOW"
                bg="/p90/covers/Mag%20Mell.jpg"
            />

            <Section
                id="key"
                title="Key Ingredient"
                bg="/p90/covers/Paper%20Bouquet.jpg"
            />

            <Section
                id="book"
                title="To Kill a Living Book"
                video
            />

        </div>
    );
}

/* ========================= */

function Section({ id, title, bg, video }) {
    return (
        <section id={id} className="panel" style={style.panel}>

            {video ? (
                <video
                    className="bg"
                    style={style.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="https://www.w3schools.com/howto/rain.mp4"
                />
            ) : (
                <div
                    className="bg"
                    style={{
                        ...style.bg,
                        backgroundImage: `url(${bg})`,
                    }}
                />
            )}

            <div style={style.overlay} />

            <div style={style.content}>
                {/* <h1 style={style.title}>{title}</h1> */}
                <RevealText text={title}/>
            </div>

        </section>
    );
}

/* =========================
   STYLES
========================= */

const style = {
    app: {
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
    },

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

    media: {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
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
        fontSize: "4rem",
        letterSpacing: "4px",
        fontWeight: 300,
    },
};