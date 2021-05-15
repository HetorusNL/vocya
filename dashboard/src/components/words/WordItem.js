import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WordItem = ({ word: { id, chapter, chapter_name, dutch, romaji } }) => {
  return (
    <div className="card text-left">
      <Link to={`/word/id/${id}`} className="text-dark">
        <p>{romaji}</p>
        <p>{dutch}</p>
      </Link>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
};

export default WordItem;
