import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import Checkbox from "./Checkbox";

const Search = ({
  itemName,
  searchItems,
  showAllItems,
  showAllItemsArgs,
  setAlert,
}) => {
  const vocyaApiContext = useContext(VocyaApiContext);

  const [text, setText] = useState("");
  const [liveSearch, setLiveSearch] = useState(true);
  const [searchWordOnly, setSearchWordOnly] = useState(true);
  const [exactMatch, setExactMatch] = useState(false);
  const location = useLocation();
  let searchBox = null;

  useEffect(() => {
    console.log("location changed, search for items and focus searchBox");
    _searchItems();
    // TODO: move to context (same with Navbar.js)
    const hamburgerMenuMaxWidth = 1500;
    // on large screens (assume pc/laptop devices) focus the searchBox
    if (window.innerWidth > hamburgerMenuMaxWidth) {
      // focus the searchBox on a location change (and thus initial loading)
      searchBox.focus();
    }
    // we don't want _searchItems in the dependency array, so ignore the warning
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("checkboxes or text changed, search for items if liveSearch");
    if (liveSearch) _searchItems();
    // we don't want _searchItems in the dependency array, so ignore the warning
  }, [text, liveSearch, searchWordOnly, exactMatch]); // eslint-disable-line react-hooks/exhaustive-deps

  let _searchItems = () => {
    if (text === "") {
      showAllItems(showAllItemsArgs);
    } else {
      searchItems({
        text: text,
        searchWordOnly: searchWordOnly,
        exactMatch: exactMatch,
      });
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
        <Checkbox
          text="Exact match"
          update={(checked) => setExactMatch(checked)}
          defaultValue={false}
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
      {vocyaApiContext.isSearching && (
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
  setAlert: PropTypes.func.isRequired,
};

export default Search;
