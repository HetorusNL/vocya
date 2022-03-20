import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChapterItem = ({ chapter: { id, name } }) => {
  return (
    <div className="card text-left">
      <Link to={`chapter/${id}`} className="text-dark">
        <p>{id}</p>
        <p>{name}</p>
      </Link>
    </div>
  );
};

ChapterItem.propTypes = {
  chapter: PropTypes.object.isRequired,
};

export default ChapterItem;
