import React, { Fragment } from "react";
import packageJson from "../../../package.json";

const About = () => {
  return (
    <Fragment>
      <h1>About This App</h1>
      <p>
        Front-end dashboard application for the vocya API and the vocjem data
      </p>
      <p>Version: {packageJson.version}</p>
    </Fragment>
  );
};

export default About;
