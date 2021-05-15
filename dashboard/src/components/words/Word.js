import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Word extends Component {
  componentDidMount() {
    this.props.getWord(this.props.match.params.id);
  }

  static propTypes = {
    loading: PropTypes.bool,
    word: PropTypes.object.isRequired,
    getWord: PropTypes.func.isRequired,
  };

  render() {
    const { id, chapter, chapter_name, dutch, romaji } = this.props.word;

    const { loading } = this.props;

    if (loading) return <Spinner />;
    const wordStyle = {
      marginTop: "1rem",
      marginBottom: "1rem",
    };

    return (
      <Fragment>
        <Link to="/" className="btn">
          Back to Search
        </Link>
        <div className="card text-left" style={wordStyle}>
          <p>id: {id}</p>
          <p>chapter: {chapter}</p>
          <p>chapter_name: {chapter_name}</p>
          <p>dutch: {dutch}</p>
          <p>romaji: {romaji}</p>
        </div>
      </Fragment>
    );
  }
}

export default Word;
