import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WordItem = ({
  word: { id, chapter, chapter_name, dutch, hiragana, romaji },
}) => {
  return (
    <div className="card text-left">
      <Link to={`/word/id/${id}`} className="text-dark">
        <p>{romaji}</p>
        <p>{dutch}</p>
        <p>{hiragana}</p>
      </Link>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
};

export default WordItem;
