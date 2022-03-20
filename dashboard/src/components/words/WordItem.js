import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WordItem = ({ word: { id, dutch, nihongo, hiragana, romaji } }) => {
  return (
    <div className="card text-left">
      <Link to={`word/${id}`} className="text-dark">
        <p>{dutch}</p>
        <p>{nihongo}</p>
        <p>{hiragana}</p>
        <p>{romaji}</p>
      </Link>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
};

export default WordItem;
