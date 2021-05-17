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
    const { loading } = this.props;

    if (loading) return <Spinner />;
    const wordStyle = {
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "max-content",
    };

    return (
      <Fragment>
        <Link to="/" className="btn">
          Back to Search
        </Link>
        <div className="card text-left" style={wordStyle}>
          <pre>{JSON.stringify(this.props.word, null, 2)}</pre>
        </div>
      </Fragment>
    );
  }
}

export default Word;
