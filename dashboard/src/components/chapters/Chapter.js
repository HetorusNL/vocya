import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import Spinner from "../layout/Spinner";

const Chapter = ({ match }) => {
  const vocyaApiContext = useContext(VocyaApiContext);

  const { chapter, loading, getChapter } = vocyaApiContext;

  useEffect(() => {
    getChapter(match.params);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const singleItemStyle = {
    margin: "auto",
    width: "max-content",
  };
  const chapterStyle = {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "max-content",
  };

  return (
    <Fragment>
      <div className="container">
        <Link to="../chapters" className="btn">
          Back to Chapters
        </Link>
        {chapter ? (
          <Fragment>
            <div className="card text-left" style={chapterStyle}>
              <p style={singleItemStyle}>
                <b>Course</b>
              </p>
              <p style={singleItemStyle}>{chapter.course_name}</p>
              <p style={singleItemStyle}>
                <b>Chapter</b>
              </p>
              <p style={singleItemStyle}>{chapter.id}</p>
              <p style={singleItemStyle}>{chapter.name}</p>
            </div>
            <Link to={`${match.params.ch_id}/words`} className="btn">
              {chapter.id} Words
            </Link>
            <div className="card text-left" style={chapterStyle}>
              <pre>{JSON.stringify(chapter, null, 2)}</pre>
            </div>
          </Fragment>
        ) : (
          <div className="card text-left" style={chapterStyle}>
            <p style={singleItemStyle}>
              <b>Error chapter "{match.params.ch_id}" not found!</b>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Chapter;
