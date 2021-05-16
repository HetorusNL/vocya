import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "../utils/Checkbox";

class Search extends Component {
  state = {
    text: "",
    liveSearch: true,
    searchRomajiDutch: true,
  };

  static propTypes = {
    searchWords: PropTypes.func.isRequired,
    showAllWords: PropTypes.func.isRequired,
    showAllWordsButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  searchWords = (query) => {
    if (query === "") {
      this.props.showAllWords();
    } else {
      this.props.searchWords(query, this.state.searchRomajiDutch);
    }
  };

  onChange = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ text: e.target.value });
    if (this.state.liveSearch) this.searchWords(e.target.value);
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "danger");
    } else {
      this.searchWords(this.state.text);
    }
  };

  render() {
    const { showAllWords, showAllWordsButton } = this.props;

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
            update={(checked) => {
              this.setState({ liveSearch: checked }, () => {
                if (this.state.liveSearch) this.searchWords(this.state.text);
              });
            }}
            defaultValue={true}
          />
          <Checkbox
            text="Search only in romaji/Dutch"
            update={(checked) => {
              this.setState({ searchRomajiDutch: checked }, () => {
                if (this.state.liveSearch) this.searchWords(this.state.text);
              });
            }}
            defaultValue={true}
          />
        </div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search words..."
            value={this.state.text}
            onChange={this.onChange}
          />
          {!this.state.liveSearch && (
            <input type="submit" value="Search" className="btn btn-block" />
          )}
        </form>
        {showAllWordsButton && (
          <button className="btn btn-block" onClick={showAllWords}>
            Show all words
          </button>
        )}
      </div>
    );
  }
}

export default Search;
