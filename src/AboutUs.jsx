import React from "react";

const members = [
    { img: "/p90/about/momocashew.jpg", name: "Cassie Wei", desc: "vocals, songwriting" },
    { img: "/p90/about/yamato.jpg", name: "Yamato Kasai", desc: "song writing, arrangements, guitar" },
    { img: "/p90/about/yukihito.jpg", name: "Yukihito", desc: "bass, arrangements" },
    { img: "/p90/about/yoshida.jpg", name: "Shoto Yoshida", desc: "drums, arrangements" },
];

export default function AboutUs() {
    const pageStyle = {
        fontFamily: "Arial, sans-serif",
        paddingTop: "8rem", // 👈 key fix (adjust if needed)
    };

    const groupImage = {
        width: "100%",
        height: "70vh",
        objectFit: "cover",
        borderRadius: "12px",
    };

    const imageWrapper = {
        width: "75%",
        margin: "0 auto",
        justifyContent: "center",
    };

    const descriptionStyle = {
        padding: "20px",
        textAlign: "center",
        fontFamily: "arno-pro",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 250px))",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
    };

    const gridItemStyle = {
        position: "relative",
        overflow: "hidden",
    };

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        transition: "transform 0.3s ease",
    };


    const dividerStyle = {
        width: "75%",
        margin: "3rem auto",
        borderTop: "2px solid #ccc",
    };

    const sectionStyle = {
        width: "75%",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "arno-pro",
    };

    const memberListStyle = {
        marginTop: "1.5rem",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };



    return (
        <div style={pageStyle}>

            {/* Giant Image */}
            <div style={imageWrapper}>
                <img
                    src="/p90/about/band1.jpg"
                    alt="band1"
                    style={{
                        width: "100%",
                        height: "70vh",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                />
            </div>

            <div style={dividerStyle}></div>

            {/* Description */}
            <div style={descriptionStyle}>
                <h1>We are Mili</h1>
                <p>Mili is an international indie band based in Japan.</p>
                <p>Mili is fully independent and not affiliated with any major label.</p>
            </div>

            <div style={dividerStyle}></div>

            {/* 2x2 Grid */}
            <div style={gridStyle}>
                {members.map((member, i) => (
                    <MemberCard key={i} member={member} />
                ))}
            </div>
            {/* Divider */}
            <div style={dividerStyle}></div>

            {/* Band Members Section */}
            <div style={sectionStyle}>
                <h1 style={{ fontWeight: 700, }}>Members</h1>

                <div style={memberListStyle}>
                    {members.map((member, i) => (
                        <div key={i}>
                            <strong>{member.name}</strong> — {member.desc}
                        </div>
                    ))}
                    <div>
                        <strong>Ao Fujimori</strong> — Illustrations, 2D animation
                    </div>
                </div>
            </div>

            <div style={dividerStyle}></div>

            <div style={imageWrapper}>
                <img
                    src="/p90/about/band2.jpg"
                    alt="band"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                />
            </div>

            <div style={imageWrapper}>
                <img
                    src="/p90/covers/Mili.PNG"
                    alt="logo"
                    style={{
                        display: "block",
                        margin: "3rem auto 4rem",
                        width: "min(250px, 25%)",
                        height: "auto",
                        borderRadius: "12px",
                    }}
                />
            </div>
        </div>
    );
}

/* Separate component so hover works cleanly */
function MemberCard({ member }) {
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