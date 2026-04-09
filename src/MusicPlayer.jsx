import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Button } from 'react-bootstrap';
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";

const trackPrefix = "/p90/tracks/";

function MusicPlayer() {
    // meta data
    const [src, setSrc] = useState("");
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("/p90/covers/Mili.PNG");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [year, setYear] = useState("");
    const audioRef = useRef(null);
    // playing
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    // animation
    const rotate = useMotionValue(0);
    const spinRef = useRef(null);

    const randomTrack = () => {
        const list = [
            "Bulbel.mp3",
            "North.mp3",
            "E-01.mp3",
            "Gluttony.mp3",
            "Harmonious.mp3",
            "North.mp3",
            "Shitty Flowers.mp3",
            "Nine Point Eight.mp3",
            "Victim.mp3",
            "String Theocracy.mp3",
            "Between Two Worlds.mp3",
        ];
        setSrc(trackPrefix + list[Math.floor(Math.random() * list.length)]);
    }

    useEffect(() => {
        randomTrack();
    }, []);

    const songCoverMap = {
        "Nine Point Eight": "/p90/covers/Nine Point Eight.PNG",
        "幾年月": "/p90/covers/幾年月.PNG",
        "Dandelion Girl, Dandelion Boy": "/p90/covers/Dandelion Girl, Dandelion Boy.jpg",
        "Bulbel": "/p90/covers/Bulbel.jpg",
        "Between Two Worlds": "/p90/covers/Between Two Worlds.jpg",
        "String Theocracy": "/p90/covers/String Theocracy.jpg",
        "Victim": "/p90/covers/Victim.jpg",
    }
    const coverMap = {
        "MAG MELL": "/p90/covers/Mag Mell.jpg",
        "Miracle Milk": "/p90/covers/Miracle Milk.jpg",
        "Millennium Mother": "/p90/covers/Millennium Mother.jpg",
        "Hue": "/p90/covers/Hue.png",
        "To Kill a Living Book": "/p90/covers/To Kill a Living Book.jpg",
        "Key Ingredient": "/p90/covers/Key Ingredient.jpg",
    };

    useEffect(() => {
        if (!src) return;
        fetch(src)
            .then(res => res.blob())
            .then(blob => {
                jsmediatags.read(blob, {
                    onSuccess: (tag) => {
                        setTitle(tag.tags.title);
                        setArtist(tag.tags.artist);
                        setAlbum(tag.tags.album);
                        setYear(tag.tags.year);

                        if (songCoverMap[tag.tags.title]) {
                            setCover(songCoverMap[tag.tags.title]);
                        } else if (coverMap[tag.tags.album]) {
                            setCover(coverMap[tag.tags.album]);
                        } else if (tag.tags.picture) {
                            const byteArray = new Uint8Array(tag.tags.picture.data);
                            // Create a Blob
                            const blob = new Blob([byteArray], { type: tag.tags.picture.format });
                            const imageUrl = URL.createObjectURL(blob);
                            setCover(imageUrl);
                        } else {
                            setCover("/p90/covers/Mili.PNG");
                        }
                        console.log(tag.tags);
                    },
                    onError: err => console.error(err)
                });
            });

    }, [src])

    useEffect(() => {

        const updateProgress = () => {
            setProgress(audioRef.current.currentTime);
        };

        const setMeta = () => {
            setDuration(audioRef.current.duration);
        };

        const handleEnd = () => {
            setPlaying(false);
            setProgress(0);
            spinRef.current?.stop();
            rotate.set(0)
            // rotationRef.current = 0;
        };

        audioRef.current.addEventListener("timeupdate", updateProgress);
        audioRef.current.addEventListener("loadedmetadata", setMeta);
        audioRef.current.addEventListener("ended", handleEnd);

        return () => {
            if (!audioRef.current) return;
            audioRef.current.removeEventListener("timeupdate", updateProgress);
            audioRef.current.removeEventListener("loadedmetadata", setMeta);
            audioRef.current.removeEventListener("ended", handleEnd);
        };
    }, [audioRef.current]);

    useEffect(() => {
        if (!playing) return;
        if (playing) {
            spinRef.current = animate(rotate, rotate.get() + 360, {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
            });
            return () => spinRef.current?.stop();
        }
    }, [playing]);


    const togglePlay = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    const progressPercent = duration ? (progress / duration) * 100 : 0;

    return (<div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
        }}
    >
        {/* Blurred Background */}
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url("${cover}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px) brightness(0.8)",
                zIndex: 0,
            }}
        ></div>

        {/* Foreground Card */}
        <div
            style={{
                backgroundColor: "rgba(31, 41, 55, 0.8)", // semi-transparent to see blurred bg
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                width: "320px",
                textAlign: "center",
                zIndex: 1,
                position: "relative",
            }}
        >
            {/* Vinyl */}
            <motion.div
                // animate={playing ? { rotate: 360 } : { rotate: rotationRef.current }}
                // transition={playing ? { duration: 15, ease: "linear", repeat: Infinity, repeatType: "loop", } : { duration: 0, ease: "linear" }}
                // onUpdate={(latest) => {
                //     // Save the current rotation while playing or paused
                //     if (playing) {
                //         rotationRef.current = latest.rotate % 360;
                //     }
                // }}
                style={{
                    rotate,
                    width: "220px",
                    height: "220px",
                    margin: "0 auto 1rem auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "inset 0 0 30px rgba(0,0,0,0.7)",
                    border: "4px solid #4b5563",
                    background: `radial-gradient(circle at center, #111 0%, #111 40%, #222 41%, #222 60%, #111 61%, #111 100%)`,
                }}
            >
                {/* Album cover in the center */}
                <img
                    src={cover}
                    alt={album}
                    style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "cover",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 10px rgba(0,0,0,0.6)",
                    }}
                />

                {/* Glossy highlight */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "10%",
                        width: "80%",
                        height: "80%",
                        borderRadius: "50%",
                        background: "radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent 60%)",
                        pointerEvents: "none",
                    }}
                ></div>
            </motion.div>

            {/* Title & Album */}
            <h2 style={{ color: "#9ca3af", fontSize: "1.25rem", fontWeight: "700", margin: "0 0 0.25rem 0" }}>
                {title}
            </h2>
            <p style={{ color: "#9ca3af", margin: "0 0 1rem 0" }}>{album}</p>

            {/* Progress Bar */}
            <input
                type="range"
                min="0"
                max="100"
                value={progressPercent}
                onChange={handleSeek}
                style={{
                    width: "100%",
                    marginBottom: "1rem",
                }}
            />

            {/* Controls */}
            <Button
                onClick={togglePlay}
                variant="primary"
                size="lg"
                className="rounded-pill"
            >
                {playing ? "Pause" : "Play"}
            </Button>

            <audio ref={audioRef} src={src} />
            {/* <audio ref={audioRef} src="/p90/tracks/02 Nine Point Eight.wav" /> */}
        </div>

    </div>)
}

export default MusicPlayer
