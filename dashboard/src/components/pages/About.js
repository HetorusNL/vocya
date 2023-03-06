import React, { Fragment, useEffect, useState } from "react";
import packageJson from "../../../package.json";

const About = () => {
  const [version, setVersion] = useState("loading build date/time...");

  useEffect(() => {
    fetch("/meta.json", { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        setVersion(meta.buildDateTime);
      });
  }, []);

  return (
    <Fragment>
      <h1>About this website</h1>
      <p>
        The vocabulair of the Kotatsu Japanese E-Mastery courses is available
        using this site. It's possible to find the words of a specific course,
        chapter or by searching all words. Also the hiragana and katakana tables
        are available. このウエブサイトの言葉を勉強します (studying the words on
        this website) is currently being worked on.
      </p>
      <br></br>
      <p>
        Front-end dashboard application for the vocya API and the vocjem data.
      </p>
      <p>
        <i>Version: {packageJson.version}</i>
      </p>
      <p>
        <i>Build date/time (local timezone): {version}</i>
      </p>
    </Fragment>
  );
};

export default About;
