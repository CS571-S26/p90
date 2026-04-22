import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import Home from "./Home.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import AboutUs from "./AboutUs.jsx";
import Library from "./Library.jsx";

function App() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div>
            {/* Background bar */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: isHome ? "0" : "100px",
                    background: isHome ? "transparent" : "black",
                    zIndex: 5,
                    transition: "all 0.4s ease",
                }}
            />
            <Link
                to="/"
                style={{
                    position: "fixed",
                    top: "1rem",
                    left: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    zIndex: 10,
                }}
            >
                <img
                    src="/p90/covers/Mili.PNG"
                    alt="Logo"
                    style={{
                        height: "80px",
                        width: "auto",
                    }}
                />
                <span
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    Project Mili
                </span>
            </Link>
            <nav
                style={{
                    position: "fixed",
                    top: "2rem",
                    right: "2.5rem",
                    zIndex: 10,
                    display: "flex",
                    gap: "2rem",
                    padding: "0.5rem 1rem",
                    // background: "rgba(255, 255, 255, 0.1)",
                    // backdropFilter: "blur(8px)",
                    // borderRadius: "12px",
                }}
            >
                {[
                    { name: "Home", path: "/", end: true },
                    { name: "Music Player", path: "/player" },
                    { name: "About Us", path: "/about" },
                    { name: "Library", path: "/library" },
                ].map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.end}
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? "#1eb5b5" : "#a8a8a8", // 👈 cyan when active
                            fontSize: "1.0rem",
                            letterSpacing: "0.08em",
                            fontFamily: "arno-pro",
                            fontWeight: "400",
                            transition: "opacity 0.25s ease, color 0.25s ease",
                        })}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.7)")}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/player" element={<MusicPlayer />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/library" element={<Library />} />
            </Routes>
        </div>
    );
}

export default App;