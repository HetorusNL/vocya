import React from "react";
import PropTypes from "prop-types";

import ChapterItem from "./ChapterItem";

const Chapters = ({ chapters }) => {
  return (
    <div className="object-grid">
      {chapters.map((chapter) => (
        <ChapterItem key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};

Chapters.propTypes = {
  chapters: PropTypes.array.isRequired,
};

export default Chapters;
