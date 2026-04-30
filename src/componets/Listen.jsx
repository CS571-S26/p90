import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { works } from "../Storage.jsx";

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
        fontSize: "4rem",
        letterSpacing: "4px",
        fontWeight: 300,
        fontFamily: "arno-pro",
        textAlign: "center",
        marginBottom: "20px",
    },

    button: {
        zIndex: 2,
        backgroundColor: "transparent",
        border: "2px solid white",
        color: "white",
        padding: "8px 20px",
        fontFamily: "arno-pro",
    }
};

export default function Listen() {
    const navigate = useNavigate();

    const playableList = works.filter((item) => {
        if (!item.category) return false;
        const lower = item.category.toLowerCase();
        return !lower.includes("album") && !lower.includes("soundtrack");
    }).map((item) => item.title);

    return (
        <section className="panel" style={style.panel}>
            <div
                className="bg"
                style={{
                    ...style.bg,
                    backgroundImage: `url("/p90/covers/flight.gif")`,
                }}
            />
            <div style={style.overlay} />

            <div style={style.content}>
                <h1 style={style.title}>Listen Now</h1>
                {/* <RevealText text="Listen Now" style={style.content} /> */}
                <Row className="justify-content-center gap-2" style={{ marginTop: 40 }}>
                    <Col xs="auto">
                        <Button style={style.button} onClick={(e) => {
                                e.stopPropagation();

                                window.dispatchEvent(
                                    new CustomEvent("PLAY_TRACK", {
                                        detail: playableList[Math.floor(Math.random() * playableList.length)],
                                    })
                                );
                            }}
                            >RANDOM</Button>
                    </Col>
                    <Col xs="auto">
                        <Button style={style.button} onClick={() => navigate("/library")}>SEARCH</Button>
                    </Col>
                </Row>
            </div>

        </section>
    );
}