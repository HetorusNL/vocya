import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import Checkbox from "./Checkbox";

const Search = ({
  itemName,
  items,
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
  const history = useHistory();
  let searchBox = null;

  // TODO: fix the race condition with the useEffects here

  useEffect(() => {
    // on load of the page, make sure to load all items
    showAllItems(showAllItemsArgs);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // when items change (e.g. the data has loaded)
    // check if we need to perform a search
    if (items.length > 0) checkQueryString();
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkQueryString = () => {
    console.log("checkQueryString");
    if (location.search) {
      const query = queryString.parse(location.search);
      if (query.search) {
        setText(query.search);
        vocyaApiContext.setIsSearching(true);
        _searchItems();
        return true;
      }
    }
    setText("");
    return false;
  };

  const setSearchText = (text) => {
    const query = queryString.parse(location.search);
    if (text) query.search = text;
    else delete query.search;
    // here location is the path after the domain name
    // location.search is the whole query string
    // location.search.search is the string the user typed in the search box
    history.push({
      location,
      search: queryString.stringify({ ...query }),
    });
    setText(text);
  };

  useEffect(() => {
    console.log("location changed, search for items and focus searchBox");
    if (!checkQueryString()) {
      showAllItems(showAllItemsArgs);
    }
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
    console.log("checkboxes changed, search for items if liveSearch");
    if (liveSearch) _searchItems();
    // we don't want _searchItems in the dependency array, so ignore the warning
  }, [liveSearch, searchWordOnly, exactMatch]); // eslint-disable-line react-hooks/exhaustive-deps

  let _searchItems = () => {
    if (text === "") {
      console.log("fetching all items");
      showAllItems(showAllItemsArgs);
    } else {
      console.log("searching items for", text);
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

  return (
    <div>
      <div className="object-grid grid-fit">
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
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.code === "Escape" && setSearchText("")}
        />
        {!liveSearch && (
          <input type="submit" value="Search" className="btn btn-block" />
        )}
      </form>
      {vocyaApiContext.isSearching && (
        <button
          className="btn btn-block"
          onClick={() => {
            showAllItems(showAllItemsArgs);
            setSearchText("");
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
