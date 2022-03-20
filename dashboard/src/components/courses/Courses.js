import React from "react";
import PropTypes from "prop-types";

import CourseItem from "./CourseItem";

const Courses = ({ courses, loading }) => {
  const courseStyle = {
    display: "grid",
    maxWidth: "1500px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={courseStyle}>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
};

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Courses;
