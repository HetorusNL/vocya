import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChapterItem = ({ chapter: { id, name } }) => {
  return (
    <div className="card text-left">
      <Link
        to={`chapter/${id}`}
        className="text-dark"
        style={{ display: "flex", flexFlow: "column", height: "100%" }}
      >
        <p style={{ flex: "0 1 auto", marginBottom: "1rem" }}>
          <p>{id}</p>
          <p>{name}</p>
        </p>
        <p style={{ flex: "1 1 auto" }}></p>
        <p>
          <Link to={`/chapter/${id}/words`} className="btn">
            Words
          </Link>
        </p>
      </Link>
    </div>
  );
};

ChapterItem.propTypes = {
  chapter: PropTypes.object.isRequired,
};

export default ChapterItem;
