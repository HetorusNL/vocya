import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import WordItem from "./WordItem";

const Words = ({ words, loading }) => {
  const [allWords, setAllWords] = useState([]);
  const [shownWords, setShownWords] = useState([]);
  const [maxElements, setMaxElements] = useState(0);
  const wordsPerPage = 50;
  const pixelsFromBottom = 500;
  const wordStyle = {
    display: "grid",
    maxWidth: "1500px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  // if words change, reset the max elements on the page to '1 page'
  useEffect(() => {
    setAllWords(words);
    setMaxElements(wordsPerPage);
  }, [words]);

  // if allWords array or the maxElements change, update the shownWords
  useEffect(() => {
    setShownWords(allWords.slice(0, maxElements));
  }, [allWords, maxElements]);

  // handle scrolling; add additional elements when pixelsFromBottom is reached
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollingElement.scrollTop;
      const scrollTopMax = e.target.scrollingElement.scrollTopMax;
      if (scrollTop + pixelsFromBottom >= scrollTopMax) {
        if (maxElements < allWords.length) {
          setMaxElements(maxElements + wordsPerPage);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      // this cleans up the event handler when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxElements, allWords]);

  return (
    <div>
      Search results: {allWords.length}, shown: {shownWords.length}
      <div style={wordStyle}>
        {shownWords.map((word) => (
          <WordItem key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
};

Words.propTypes = {
  words: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Words;
