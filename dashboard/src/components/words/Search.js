import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
    liveSearch: true,
  };

  static propTypes = {
    searchWords: PropTypes.func.isRequired,
    showAllWords: PropTypes.func.isRequired,
    showAllWordsButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  toggleLiveSearch = () => {
    this.setState({ liveSearch: !this.state.liveSearch });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.liveSearch)
      if (e.target.value === "") {
        this.props.showAllWords();
      } else {
        this.props.searchWords(e.target.value);
      }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "danger");
    } else {
      this.props.searchWords(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { showAllWords, showAllWordsButton } = this.props;

    return (
      <div>
        <button
          className={
            "btn btn-block " +
            (this.state.liveSearch ? "btn-success" : "btn-danger")
          }
          onClick={this.toggleLiveSearch}
        >
          {(this.state.liveSearch ? "Disable" : "Enable") + " live search"}
        </button>
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
