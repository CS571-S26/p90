import { useState } from "react";

export default function CollectionCard(props) {
    const [hovered, setHovered] = useState(false);

    const isPlayable = (category) => {
        if (!category) return false;
        const lower = category.toLowerCase();
        return !lower.includes("album") && !lower.includes("original soundtrack");
    };

    const cardStyle = {
        cursor: "pointer",
        transition: "all 0.25s ease",
        textAlign: "center",
        borderRadius: "6px",
    };

    const imageWrap = {
        width: "100%",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        borderRadius: "6px",
        background: "#ddd",
        position: "relative",
    };

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        background: hovered ? "rgba(0,0,0,0.4)" : "transparent",
        opacity: hovered ? 1 : 0,
        transition: "0.25s ease",
    };

    const buttonStyle = {
        padding: "6px 10px",
        fontSize: "12px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        background: "#fff",
    };

    const titleStyle = {
        fontSize: "14px",
        fontWeight: 400,
        margin: "10px 0 2px",
    };

    const subtitleStyle = {
        fontSize: "10px",
        fontWeight: 250,
        margin: "0px 0 2px",
    };

    const yearStyle = {
        fontSize: "12px",
        opacity: 0.6,
        margin: 0,
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={imageWrap}>
                <img src={props.cover} alt={props.title} style={imgStyle} />

                <div style={overlayStyle}>
                    {/* LINK BUTTON */}
                    {props.link && (
                        <button
                            style={buttonStyle}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(props.link, "_blank", "noopener,noreferrer");
                            }}
                        >
                            Link
                        </button>
                    )}

                    {/* PLAY BUTTON */}
                    {isPlayable(props.category) && (
                        <button
                            style={buttonStyle}
                            onClick={(e) => {
                                e.stopPropagation();

                                window.dispatchEvent(
                                    new CustomEvent("PLAY_TRACK", {
                                        detail: props.title,
                                    })
                                );
                            }}
                        >
                            ▶ Play
                        </button>
                    )}
                </div>
            </div>

            <h3 style={titleStyle}>{props.title}</h3>
            {props.subtitle && <h4 style={subtitleStyle}>{props.subtitle}</h4>}
            <p style={yearStyle}>{props.category}</p>
            <p style={yearStyle}>{props.year}</p>
        </div>
    );
}