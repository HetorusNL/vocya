import React, { useContext, useEffect, useState } from "react";
import Menu from "react-burger-menu/lib/menus/slide";
import { Link } from "react-router-dom";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import { ReactComponent as Transceive } from "./transceive.svg";
import { ReactComponent as Idle } from "./idle.svg";
import "./Sidebar.css";

const Navbar = () => {
  const vocyaApiContext = useContext(VocyaApiContext);

  // switch to hamburger menu if the screen width is less than hamburgerMenuMaxWidth
  const hamburgerMenuMaxWidth = 1600;
  const [useHamburgerMenu, setUseHamburgerMenu] = useState(
    window.innerWidth < hamburgerMenuMaxWidth
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // monitor resize events and store the window width on a resize
  useEffect(() => {
    const handleResizeWindow = () =>
      setUseHamburgerMenu(window.innerWidth < hamburgerMenuMaxWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  const links = [
    { to: "/", name: "Home" },
    { to: "/benkyou", name: "勉強(study)" },
    { to: "/courses", name: "Courses" },
    { to: "/chapters", name: "Chapters" },
    { to: "/course/jem1/words", name: "JEM1 words" },
    { to: "/course/jem-old-1/words", name: "JEM1 (old) words" },
    { to: "/course/jem2/words", name: "JEM2 words" },
    { to: "/course/jem3/words", name: "JEM3 words" },
    { to: "/course/jem4/words", name: "JEM4 words" },
    { to: "/table/hiragana", name: "Hiragana table" },
    { to: "/table/katakana", name: "Katakana table" },
    { to: "/about", name: "About" },
  ];

  return (
    <React.Fragment>
      {/* render a hamburger menu, as the width is smaller than some value */}
      {useHamburgerMenu && (
        <Menu
          isOpen={menuOpen}
          onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
        >
          {links.map((link, index) => (
            <Link key={index} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
        </Menu>
      )}
      <nav className="navbar bg-primary">
        <div
          style={{
            paddingLeft: useHamburgerMenu ? "50px" : "0px",
            display: "flex",
          }}
        >
          <Link to="/">
            <h1>Vocya dashboard</h1>
          </Link>
          {vocyaApiContext.loading ? (
            <Transceive
              fill="limegreen"
              style={{ width: "40px", height: "40px", marginTop: "5px" }}
            />
          ) : (
            <Idle
              fill="white"
              style={{ width: "40px", height: "40px", marginTop: "5px" }}
            ></Idle>
          )}
        </div>
        {/* render a navbar menu, as the width is larger than some value */}
        {!useHamburgerMenu && (
          <div style={{ display: "flex" }}>
            {links.map((link, index) => (
              <Link key={index} to={link.to}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
