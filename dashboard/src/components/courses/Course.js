import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Course extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params);
  }

  static propTypes = {
    getCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  render() {
    const { course, loading } = this.props;

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
            <Link
              to={`${this.props.match.params.co_id}/chapters`}
              className="btn"
            >
              {course.abbreviation} Chapters
            </Link>
            <Link to={`${this.props.match.params.co_id}/words`} className="btn">
              {course.abbreviation} Words
            </Link>
            <div className="card text-left" style={courseStyle}>
              <pre>{JSON.stringify(course, null, 2)}</pre>
            </div>
          </Fragment>
        ) : (
          <div className="card text-left" style={courseStyle}>
            <p style={singleItemStyle}>
              <b>Error course "{this.props.match.params.co_id}" not found!</b>
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Course;
