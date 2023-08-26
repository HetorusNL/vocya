import React, { Fragment, useContext, useEffect, useState } from "react";
import packageJson from "../../../package.json";
import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";

const About = () => {
  const vocyaApiContext = useContext(VocyaApiContext);

  const { dbUpdateStatus } = vocyaApiContext;

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
        The vocabulary of the Kotatsu Japanese E-Mastery courses is available
        using this site. It's possible to find the words of a specific course,
        chapter or by searching all words. Also the hiragana and katakana tables
        are available. このウエブサイトの言葉を勉強します (studying the words on
        this website) can be done by browsing for words to study, and clicking
        on '勉強(study)'.
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
      <br></br>
      <div>
        <div
          className="btn"
          onClick={() => vocyaApiContext.actionUpdateDatabase()}
        >
          Update database
        </div>
        Database update result: {dbUpdateStatus}
      </div>
    </Fragment>
  );
};

export default About;
