import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Chapter extends Component {
  componentDidMount() {
    this.props.getChapter(this.props.match.params);
  }

  static propTypes = {
    getChapter: PropTypes.func.isRequired,
    chapter: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  render() {
    const { chapter, loading } = this.props;

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
            <Link to={`${this.props.match.params.ch_id}/words`} className="btn">
              {chapter.id} Words
            </Link>
            <div className="card text-left" style={chapterStyle}>
              <pre>{JSON.stringify(chapter, null, 2)}</pre>
            </div>
          </Fragment>
        ) : (
          <div className="card text-left" style={chapterStyle}>
            <p style={singleItemStyle}>
              <b>Error chapter "{this.props.match.params.ch_id}" not found!</b>
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Chapter;
