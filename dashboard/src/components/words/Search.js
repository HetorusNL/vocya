import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Checkbox from "../utils/Checkbox";

const Search = ({
  searchWords,
  showAllWords,
  showAllWordsButton,
  setAlert,
}) => {
  const [text, setText] = useState("");
  const [liveSearch, setLiveSearch] = useState(true);
  const [searchWordOnly, setSearchWordOnly] = useState(true);
  const location = useLocation();
  let { course } = useParams();

  useEffect(() => {
    console.log("location changed, search for words");
    _searchWords();
    // we don't want _searchWords in the dependency array, so ignore the warning
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("checkboxes or text changed, search for words if liveSearch");
    if (liveSearch) _searchWords();
    // we don't want _searchWords in the dependency array, so ignore the warning
  }, [searchWordOnly, liveSearch, text]); // eslint-disable-line react-hooks/exhaustive-deps

  let _searchWords = () => {
    if (text === "") {
      course ? showAllWords(course) : showAllWords();
    } else {
      course
        ? searchWords(course, text, searchWordOnly)
        : searchWords(text, searchWordOnly);
    }
  };

  let onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "danger");
    } else {
      _searchWords(text, searchWordOnly);
    }
  };

  const wordStyle = {
    display: "grid",
    maxWidth: "1500px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div>
      <div style={wordStyle}>
        <Checkbox
          text="Live search"
          update={(checked) => setLiveSearch(checked)}
          defaultValue={true}
        />
        <Checkbox
          text="Search in words only"
          update={(checked) => setSearchWordOnly(checked)}
          defaultValue={true}
        />
      </div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search words..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {!liveSearch && (
          <input type="submit" value="Search" className="btn btn-block" />
        )}
      </form>
      {showAllWordsButton && (
        <button
          className="btn btn-block"
          onClick={() => {
            showAllWords();
            setText("");
          }}
        >
          Show all words
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchWords: PropTypes.func.isRequired,
  showAllWords: PropTypes.func.isRequired,
  showAllWordsButton: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
