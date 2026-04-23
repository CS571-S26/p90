import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

    subtitle: {
        fontSize: "1.5rem",
        letterSpacing: "2px",
        fontWeight: 150,
        fontFamily: "arno-pro",
        textAlign: "center",
        marginBottom: "10px",
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

export default function MagnoliaVinyl() {
    const navigate = useNavigate();

    return (
        <section className="panel" style={style.panel}>
            <div
                className="bg"
                style={{
                    ...style.bg,
                    backgroundImage: `url("/p90/covers/Ender%20Magnolia%20Vinyl.jpg")`,
                }}
            />
            <div style={style.overlay} />

            <div style={style.content}>
                <h3 style={style.subtitle}>NEW ALBUM & VINYL RECORD</h3>
                <h1 style={style.title}>ENDER MAGNOLIA</h1>
                <h3 style={{ ...style.subtitle, fontStyle: "italic" }}>Original Soundtrack</h3>
                {/* <RevealText text="Listen Now" style={style.content} /> */}
                <Row className="justify-content-center gap-2" style={{ marginTop: 40 }}>
                    <Col xs="auto">
                        <Button style={style.button} onClick={() => navigate("/player")}>LISTEN</Button>
                    </Col>
                    <Col xs="auto">
                        <Button style={style.button} onClick={() => window.location.href = "https://projectmili.store/products/ender-magnolia-original-soundtrack-vinyl-record"}>
                            PURCHASE
                        </Button>
                    </Col>
                </Row>
            </div>
            
        </section>
    );
}