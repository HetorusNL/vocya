import React from "react";
import PropTypes from "prop-types";

import WordItem from "./WordItem";
import Spinner from "../layout/Spinner";

const Words = ({ words, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    const wordStyle = {
      display: "grid",
      maxWidth: "1500px",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gridGap: "1rem",
      marginTop: "1rem",
      marginBottom: "1rem",
    };

    return (
      <div style={wordStyle}>
        {words.map((word) => (
          <WordItem key={word.id} word={word} />
        ))}
      </div>
    );
  }
};

Words.propTypes = {
  words: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Words;
