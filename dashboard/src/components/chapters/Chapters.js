import React from "react";
import PropTypes from "prop-types";

import ChapterItem from "./ChapterItem";

const Chapters = ({ chapters }) => {
  const chapterStyle = {
    display: "grid",
    maxWidth: "1500px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={chapterStyle}>
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
