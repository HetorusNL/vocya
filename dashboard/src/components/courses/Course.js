import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import Spinner from "../layout/Spinner";

const Course = ({ match }) => {
  const vocyaApiContext = useContext(VocyaApiContext);

  const { course, loading, getCourse } = vocyaApiContext;

  useEffect(() => {
    getCourse(match.params);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const singleItemStyle = {
    margin: "auto",
    width: "max-content",
  };
  const courseStyle = {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "max-content",
  };

  return (
    <Fragment>
      <div className="container">
        <Link to="../courses" className="btn">
          Back to Courses
        </Link>
        {course ? (
          <Fragment>
            <div className="card text-left" style={courseStyle}>
              <p style={singleItemStyle}>
                <b>Course</b>
              </p>
              <p style={singleItemStyle}>{course.name}</p>
            </div>
            <Link to={`${match.params.co_id}/chapters`} className="btn">
              {course.abbreviation} Chapters
            </Link>
            <Link to={`${match.params.co_id}/words`} className="btn">
              {course.abbreviation} Words
            </Link>
            <div className="card text-left" style={courseStyle}>
              <pre>{JSON.stringify(course, null, 2)}</pre>
            </div>
          </Fragment>
        ) : (
          <div className="card text-left" style={courseStyle}>
            <p style={singleItemStyle}>
              <b>Error course "{match.params.co_id}" not found!</b>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Course;
