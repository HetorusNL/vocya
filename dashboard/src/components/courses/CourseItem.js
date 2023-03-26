import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseItem = ({ course: { id, abbreviation, name } }) => {
  return (
    <div className="card text-left">
      <Link
        to={`/course/${id}`}
        className="text-dark"
        style={{ display: "flex", flexFlow: "column", height: "100%" }}
      >
        <div style={{ flex: "0 1 auto", marginBottom: "1rem" }}>
          <p>{abbreviation}</p>
          <p>{name}</p>
        </div>
        <p style={{ flex: "1 1 auto" }}></p>
        <p>
          <Link to={`/course/${id}/chapters`} className="btn">
            Chapters
          </Link>
          <Link to={`/course/${id}/words`} className="btn">
            Words
          </Link>
        </p>
      </Link>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
