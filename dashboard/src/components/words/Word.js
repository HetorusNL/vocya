import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Word extends Component {
  componentDidMount() {
    this.props.getWord(this.props.match.params);
  }

  static propTypes = {
    getWord: PropTypes.func.isRequired,
    word: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  render() {
    const { word, loading } = this.props;

    if (loading) return <Spinner />;
    const singleItemStyle = {
      margin: "auto",
      width: "max-content",
    };
    const wordStyle = {
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "max-content",
    };

    return (
      <Fragment>
        <Link to="../words" className="btn">
          Back to Search
        </Link>
        {word ? (
          <Fragment>
            {word.nihongo && (
              <div className="card text-left" style={wordStyle}>
                <p style={singleItemStyle}>
                  <b>Japanese</b>
                </p>
                <p style={{ ...singleItemStyle, fontSize: "5rem" }}>
                  {word.nihongo}
                </p>
              </div>
            )}
            {word.hiragana && (
              <div className="card text-left" style={wordStyle}>
                <p style={singleItemStyle}>
                  <b>Hiragana</b>
                </p>
                <p style={{ ...singleItemStyle, fontSize: "3rem" }}>
                  {word.hiragana}
                </p>
              </div>
            )}
            {word.dutch && (
              <div className="card text-left" style={wordStyle}>
                <p style={singleItemStyle}>
                  <b>Dutch</b>
                </p>
                <p style={{ ...singleItemStyle, fontSize: "1.5rem" }}>
                  {word.dutch}
                </p>
              </div>
            )}
            <div className="card text-left" style={wordStyle}>
              <pre>{JSON.stringify(word, null, 2)}</pre>
            </div>
          </Fragment>
        ) : (
          <div className="card text-left" style={wordStyle}>
            <p style={singleItemStyle}>
              <b>Error word "{this.props.match.params.wo_id}" not found!</b>
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Word;
