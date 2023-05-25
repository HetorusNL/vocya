import React from "react";
import PropTypes from "prop-types";

import CourseItem from "./CourseItem";

const Courses = ({ courses }) => {
  return (
    <div className="object-grid">
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
};

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default Courses;
