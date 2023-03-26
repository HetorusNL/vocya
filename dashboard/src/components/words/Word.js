import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import Spinner from "../layout/Spinner";

const Word = ({ match }) => {
  const vocyaApiContext = useContext(VocyaApiContext);

  const { word, loading } = vocyaApiContext;

  useEffect(() => {
    if (match.params.co_id && match.params.ch_id && match.params.wo_id) {
      vocyaApiContext.getCourseChapterWord(match.params);
    } else if (match.params.co_id && match.params.wo_id) {
      vocyaApiContext.getCourseWord(match.params);
    } else if (match.params.ch_id && match.params.wo_id) {
      vocyaApiContext.getChapterWord(match.params);
    } else {
      vocyaApiContext.getWord(match.params);
    }
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const singleItemStyle = {
    margin: "auto",
    width: "max-content",
  };
  const wordStyle = {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "max-content",
  };

  return (
    <Fragment>
      <div className="container">
        <Link to="../words" className="btn">
          Back to Search
        </Link>
        {word ? (
          <Fragment>
            {word.nihongo && (
              <div className="card text-left" style={wordStyle}>
                <p style={singleItemStyle}>
                  <b>Japanese</b>
                </p>
                <p style={{ ...singleItemStyle, fontSize: "5rem" }}>
                  {word.nihongo}
                </p>
              </div>
            )}
            {word.hiragana && (
              <div className="card text-left" style={wordStyle}>
                <p style={singleItemStyle}>
                  <b>Hiragana</b>
                </p>
                <p style={{ ...singleItemStyle, fontSize: "3rem" }}>
                  {word.hiragana}
                </p>
              </div>
            )}
            {word.dutch && (
              <div className="card text-left" style={wordStyle}>
                <p style={singleItemStyle}>
                  <b>Dutch</b>
                </p>
                <p style={{ ...singleItemStyle, fontSize: "1.5rem" }}>
                  {word.dutch}
                </p>
              </div>
            )}
            <div className="card text-left" style={wordStyle}>
              <pre>{JSON.stringify(word, null, 2)}</pre>
            </div>
          </Fragment>
        ) : (
          <div className="card text-left" style={wordStyle}>
            <p style={singleItemStyle}>
              <b>Error word "{match.params.wo_id}" not found!</b>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Word;
