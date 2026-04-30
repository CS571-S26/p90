import { useState, useRef, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    animate,
    useTransform,
} from "framer-motion";
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import { albums, works } from "./Storage";

const trackPrefix = "/p90/tracks/";

const styles = {
    miniPlayer: {
        position: "fixed",
        bottom: 30,
        right: 30,
        width: 70,
        height: 70,
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 9999,
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3)",
        border: "2px solid rgba(255,255,255,0.15)",
    },

    miniImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    modalOverlay: {
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    backdrop: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
    },

    modal: {
        position: "relative",
        width: 340,
        padding: "1.5rem",
        borderRadius: "1rem",
        background: "#1f2937",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    },

    vinyl: {
        width: 220,
        height: 220,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.7)",
        border: "4px solid #4b5563",
        background: `radial-gradient(circle at center,
            #111 0%,
            #111 40%,
            #222 41%,
            #222 60%,
            #111 61%,
            #111 100%)`,
    },

    vinylArt: {
        width: "70%",
        height: "70%",
        objectFit: "cover",
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },

    progress: {
        width: "100%",
    },

    button: {
        background: "transparent",
        border: "2px solid white",
        color: "white",
        padding: "8px 20px",
        borderRadius: "999px",
        cursor: "pointer",
    },
};

// ---------------- DATA ----------------
// const songCoverMap = {
//     "Nine Point Eight": "/p90/covers/Nine Point Eight.PNG",
//     "幾年月": "/p90/covers/幾年月.PNG",
//     "Dandelion Girl, Dandelion Boy": "/p90/covers/Dandelion Girl, Dandelion Boy.jpg",
//     "Bulbel": "/p90/covers/Bulbel.jpg",
//     "Between Two Worlds": "/p90/covers/Between Two Worlds.jpg",
//     "String Theocracy": "/p90/covers/String Theocracy.jpg",
//     "Victim": "/p90/covers/Victim.jpg",
// };
const songCoverMap = Object.fromEntries(
    works.map((item) => [item.title, item.cover])
);

const coverMap = Object.fromEntries(
    albums.map((item) => [item.title, item.cover])
);

// const coverMap = {
//     "MAG MELL": "/p90/covers/Mag Mell.jpg",
//     "Miracle Milk": "/p90/covers/Miracle Milk.jpg",
//     "Millennium Mother": "/p90/covers/Millennium Mother.jpg",
//     "Hue": "/p90/covers/Hue.png",
//     "To Kill a Living Book": "/p90/covers/To Kill a Living Book.jpg",
//     "Key Ingredient": "/p90/covers/Key Ingredient.jpg",
// };



export default function FloatingMusicPlayer() {
    const [expanded, setExpanded] = useState(false);

    const [src, setSrc] = useState("");
    const [title, setTitle] = useState("");
    const [album, setAlbum] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [cover, setCover] = useState("/p90/covers/Mili.PNG");
    const [bg, setBg] = useState("rgba(0,0,0,0.6)");

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);
    const wasDragged = useRef(false);

    const rotate = useMotionValue(0);
    const spinRef = useRef(null);

    const wobble = useTransform(rotate, (r) => Math.sin(r / 30) * 0.5);

    const extractColor = (imgSrc) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 50;
            canvas.height = 50;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, 50, 50);

            const data = ctx.getImageData(0, 0, 50, 50).data;

            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }

            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            setBg(`rgba(${r}, ${g}, ${b}, 0.35)`);
        };
    };

    // ---------------- TRACK ----------------
    const playTrackByTitle = (trackTitle) => {
        const fileName = `${trackTitle}.mp3`;
        const fullPath = trackPrefix + fileName;

        setSrc(fullPath);
        setExpanded(true);
        setPlaying(false);
    };

    const randomTrack = () => {
        const list = [
            "Bulbel.mp3",
            "North.mp3",
            "E-01.mp3",
            "Gluttony.mp3",
            "Harmonious.mp3",
            "Shitty Flowers.mp3",
            "Nine Point Eight.mp3",
            "Victim.mp3",
            "String Theocracy.mp3",
            "Between Two Worlds.mp3",
        ];
        setSrc(trackPrefix + list[Math.floor(Math.random() * list.length)]);
    };

    // useEffect(() => {
    //     randomTrack();
    // }, []);
    useEffect(() => {
        const handler = (e) => {
            playTrackByTitle(e.detail);
        };

        window.addEventListener("PLAY_TRACK", handler);
        return () => window.removeEventListener("PLAY_TRACK", handler);
    }, []);

    // ---------------- METADATA ----------------
    useEffect(() => {
        if (!src) return;

        fetch(src)
            .then((res) => res.blob())
            .then((blob) => {
                jsmediatags.read(blob, {
                    onSuccess: ({ tags: t }) => {
                        setTitle(t.title || "");
                        setArtist(t.artist || "");
                        setAlbum(t.album || "");
                        setYear(t.year || "");

                        if (songCoverMap[t.title]) {
                            setCover(songCoverMap[t.title]);
                            extractColor(songCoverMap[t.title]);
                        } else if (coverMap[t.album]) {
                            setCover(coverMap[t.album]);
                            extractColor(coverMap[t.album]);
                        } else if (t.picture) {
                            const byteArray = new Uint8Array(t.picture.data);
                            const imgBlob = new Blob([byteArray], {
                                type: t.picture.format,
                            });
                            setCover(URL.createObjectURL(imgBlob));
                            extractColor(URL.createObjectURL(imgBlob));
                        } else {
                            setCover("/p90/covers/Mili.PNG");
                            extractColor("/p90/covers/Mili.PNG");
                        }
                    },
                    onError: console.error,
                });
            });
    }, [src]);

    // ---------------- AUDIO ----------------
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const update = () => setProgress(audio.currentTime);
        const meta = () => setDuration(audio.duration);

        const end = () => {
            setPlaying(false);
            setProgress(0);
            rotate.set(0);
            randomTrack();
        };

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", meta);
        audio.addEventListener("ended", end);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", meta);
            audio.removeEventListener("ended", end);
        };
    }, []);

    // ---------------- ROTATION ----------------
    useEffect(() => {
        if (!playing) {
            spinRef.current?.stop();
            return;
        }

        spinRef.current = animate(rotate, rotate.get() + 360, {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
        });

        return () => spinRef.current?.stop();
    }, [playing]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) audio.pause();
        else await audio.play().catch(() => { });

        setPlaying(!playing);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const t = (e.target.value / 100) * duration;
        audio.currentTime = t;
        setProgress(t);
    };

    const progressPercent = duration ? (progress / duration) * 100 : 0;

    // ---------------- UI ----------------
    return (
        <>
            <audio ref={audioRef} src={src} />

            {/* MINI PLAYER */}
            <AnimatePresence>
                {!expanded && (
                    <motion.div
                        key="mini"
                        drag
                        dragMomentum={false}
                        onDrag={() => (wasDragged.current = true)}
                        onDragEnd={() =>
                            setTimeout(() => (wasDragged.current = false), 0)
                        }
                        onTap={() => {
                            if (!wasDragged.current) setExpanded(true);
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        style={styles.miniPlayer}
                    >
                        <img src={cover} style={styles.miniImg} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        onClick={() => setExpanded(false)}
                        style={styles.modalOverlay}
                    >
                        <div style={styles.backdrop} />

                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            style={{ ...styles.modal, background: bg, backdropFilter: "blur(20px)", }}
                        >
                            {/* VINYL */}
                            <motion.div style={{ ...styles.vinyl, rotate }}>
                                <img
                                    src={cover}
                                    style={{
                                        ...styles.vinylArt,
                                        x: wobble,
                                    }}
                                />
                            </motion.div>

                            <h3>{title}</h3>
                            <p>{album}</p>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progressPercent}
                                onChange={handleSeek}
                                style={styles.progress}
                            />

                            <button onClick={togglePlay} style={styles.button}>
                                {playing ? "Pause" : "Play"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}