import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";

const Search = ({
  itemName,
  searchItems,
  showAllItems,
  showAllItemsArgs,
  isSearching,
  setAlert,
}) => {
  const [text, setText] = useState("");
  const [liveSearch, setLiveSearch] = useState(true);
  const [searchWordOnly, setSearchWordOnly] = useState(true);
  const location = useLocation();
  let searchBox = null;

  useEffect(() => {
    console.log("location changed, search for items and focus searchBox");
    _searchItems();
    searchBox.focus(); // focus the searchBox on a location change (and thus initial loading)
    // we don't want _searchItems in the dependency array, so ignore the warning
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("checkboxes or text changed, search for items if liveSearch");
    if (liveSearch) _searchItems();
    // we don't want _searchItems in the dependency array, so ignore the warning
  }, [searchWordOnly, liveSearch, text]); // eslint-disable-line react-hooks/exhaustive-deps

  let _searchItems = () => {
    if (text === "") {
      showAllItems(showAllItemsArgs);
    } else {
      searchItems({ text: text, searchWordOnly: searchWordOnly });
    }
  };

  let onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "danger");
    } else {
      _searchItems();
    }
  };

  const itemStyle = {
    display: "grid",
    maxWidth: "1500px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div>
      <div style={itemStyle}>
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
          placeholder={`Search ${itemName}...`}
          value={text}
          ref={(input) => (searchBox = input)}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.code === "Escape" && setText("")}
        />
        {!liveSearch && (
          <input type="submit" value="Search" className="btn btn-block" />
        )}
      </form>
      {isSearching && (
        <button
          className="btn btn-block"
          onClick={() => {
            showAllItems();
            setText("");
          }}
        >
          Show all {itemName}
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchItems: PropTypes.func.isRequired,
  showAllItems: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
