import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import WordItem from "./WordItem";

const Words = ({ words }) => {
  const [allWords, setAllWords] = useState([]);
  const [shownWords, setShownWords] = useState([]);
  const [maxElements, setMaxElements] = useState(0);
  const wordsPerPage = 50;
  const targetPixelsFromBottom = 2000;

  // if words change, reset the max elements on the page to '2 pages'
  useEffect(() => {
    setAllWords(words);
    setMaxElements(2 * wordsPerPage);
  }, [words]);

  // if allWords array or the maxElements change, update the shownWords
  useEffect(() => {
    setShownWords(allWords.slice(0, maxElements));
  }, [allWords, maxElements]);

  // handle scrolling; add additional elements when pixelsFromBottom is reached
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.scrollingElement.scrollHeight;
      const scrollTop = e.target.scrollingElement.scrollTop;
      const clientHeight = e.target.scrollingElement.clientHeight;
      const currentPixelsFromBottom = scrollHeight - scrollTop - clientHeight;
      if (currentPixelsFromBottom <= targetPixelsFromBottom) {
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
      <div className="object-grid">
        {shownWords.map((word) => (
          <WordItem key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
};

Words.propTypes = {
  words: PropTypes.array.isRequired,
};

export default Words;
