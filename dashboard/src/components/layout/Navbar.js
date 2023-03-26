import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import { ReactComponent as Transceive } from "./transceive.svg";
import { ReactComponent as Idle } from "./idle.svg";

const Navbar = ({ title }) => {
  const vocyaApiContext = useContext(VocyaApiContext);

  return (
    <nav className="navbar bg-primary">
      <div style={{ display: "flex" }}>
        <Link to="/">
          <h1>{title}</h1>
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
      <div style={{ display: "flex" }}>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/chapters">Chapters</Link>
        <Link to="/course/jem1/words">JEM1 words</Link>
        <Link to="/course/jem-old-1/words">JEM1 (old) words</Link>
        <Link to="/course/jem2/words">JEM2 words</Link>
        <Link to="/course/jem3/words">JEM3 words</Link>
        <Link to="/course/jem4/words">JEM4 words</Link>
        <Link to="/table/hiragana">Hiragana table</Link>
        <Link to="/table/katakana">Katakana table</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Vocya dashboard",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
