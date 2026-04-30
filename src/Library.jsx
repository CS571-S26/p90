import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LibraryIntro from "./componets/LibraryIntro.jsx";
import CollectionCard from "./componets/CollectionCard.jsx";
import { albums, works } from "./Storage.jsx";

const style = {
    dividerStyle: {
        width: "75%",
        margin: "3rem auto",
        borderTop: "2px solid #ccc",
    },
    pageStyle: {
        fontFamily: "Alice",
        paddingTop: "8rem",
    },
    header: {
        // padding: "20px",
        textAlign: "center",
        fontFamily: "alice",
    },
    title: {
        fontSize: "48px",
        fontWeight: 300,
        letterSpacing: "2px",
        margin: 0,
    },
    subtitle: {
        marginTop: "8px",
        opacity: 0.6,
        fontSize: "14px",
    },
    gridStyle: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "2rem",
        width: "75%",
        margin: "0 auto",
    },
};

function Library() {
    const [status, setStatus] = useState("loading");
    const [search, setSearch] = useState("");
    // loading → intro → done

    const filteredAlbums = albums.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const filteredWorks = works.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const seen = sessionStorage.getItem("seenIntro");

        if (seen === "true") {
            setStatus("done");
        } else {
            setStatus("intro");
        }
    }, []);

    const handleFinish = () => {
        sessionStorage.setItem("seenIntro", "true");
        setStatus("done");
    };

    return (
        <AnimatePresence mode="wait">
            {status === "intro" && (
                <LibraryIntro
                    key="intro"
                    onFinish={handleFinish}
                />
            )}

            {status === "done" && (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={style.pageStyle}
                >
                    <div style={{ textAlign: "center", margin: "1.5rem 0" }}>
                        <input
                            type="text"
                            placeholder="Search songs or albums..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: "10px 14px",
                                width: "70%",
                                maxWidth: "400px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "14px",
                            }}
                        />
                    </div>
                    {filteredAlbums.length > 0 && (
                        <>
                            <header style={style.header}>
                                <h1 style={style.title}>Albums</h1>
                            </header>
                            <div style={style.dividerStyle} />
                            <div style={style.gridStyle}>
                                {filteredAlbums.map((album) => (
                                    <CollectionCard key={album.title} {...album} />
                                ))}
                            </div>
                        </>
                    )}

                    {filteredWorks.length > 0 && (
                        <>
                            <header style={{ ...style.header, paddingTop: "4rem", }}>
                                <h1 style={style.title}>Collection</h1>
                            </header>
                            <div style={style.dividerStyle} />
                            <div style={style.gridStyle}>
                                {filteredWorks.map((song) => (
                                    <CollectionCard key={song.title} {...song} />
                                ))}
                            </div>
                            <div style={style.dividerStyle} />
                        </>
                    )}
                    {filteredAlbums.length === 0 && filteredWorks.length === 0 && (
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "3rem",
                                opacity: 0.7,
                                fontSize: "14px",
                            }}
                        >
                            No results found for “{search}”. Try a different keyword.
                        </div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Library;