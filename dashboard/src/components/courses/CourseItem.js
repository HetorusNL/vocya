import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseItem = ({ course: { id, abbreviation, name } }) => {
  return (
    <div className="card text-left">
      <Link to={`/course/${id}`} className="text-dark">
        <p>{abbreviation}</p>
        <p>{name}</p>
      </Link>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
