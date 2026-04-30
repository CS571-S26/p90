import React from "react";

export default function MemberCard({ member }) {
    const gridItemStyle = {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px", // spacing around the image
        borderRadius: "8px",
    };

    const imgStyle = {
        width: "80%", // make the card slightly narrower for compact feel
        height: "100%", // full height
        objectFit: "cover",
        display: "block",
        transition: "transform 0.3s ease, filter 0.3s ease",
        borderRadius: "8px",
        // filter: "brightness(0.9)",
        WebkitBoxReflect: "below 5px linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,1))",
    };

    const overlayStyle = {
        position: "absolute",
        inset: 0, // covers the entire parent
        left: "10%", // center horizontally: (100% - 80%) / 2
        width: "80%", // same as image
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        gap: "0.5rem",
        transition: "opacity 0.3s ease",
        textAlign: "center",
        padding: "10px",
        fontFamily: "arno-pro",
        borderRadius: "12px",
    };

    const [hover, setHover] = React.useState(false);

    return (
        <div
            style={gridItemStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                src={member.img}
                alt={member.name}
                style={{
                    ...imgStyle,
                    transform: hover ? "scale(1.05)" : "scale(1)",
                    filter: hover ? "brightness(1) grayscale(0)" : "brightness(0.9)",
                }}
            />

            <div
                style={{
                    ...overlayStyle,
                    opacity: hover ? 1 : 0,
                }}
            >
                <h3>{member.name}</h3>
                <p>{member.desc}</p>
            </div>
        </div>
    );
}