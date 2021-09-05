import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import CacheBuster from "./components/utils/CacheBuster";
import Search from "./components/words/Search";
import Word from "./components/words/Word";
import Words from "./components/words/Words";

class App extends Component {
  state = {
    words: [],
    word: {},
    loading: false,
    alert: null,
    showAllWordsButton: false,
  };

  showAllWords = async () => {
    this.setState({ loading: true });
    this.setState({ showAllWordsButton: false });
    const res = await axios.get(`https://api.vocya.hetorus.nl/words`);
    this.setState({ words: res.data, loading: false });
  };

  // search for words via the vocya API
  searchWords = async (text, searchWordOnly) => {
    this.setState({ loading: true });
    this.setState({ showAllWordsButton: true });
    const res = await axios.get(
      `https://api.vocya.hetorus.nl/search/word/${
        searchWordOnly ? "romaji,dutch,hiragana,kanji" : "*"
      }/${text}`
    );
    this.setState({ words: res.data, loading: false });
  };

  showAllCourseWords = async (course) => {
    this.setState({ loading: true });
    this.setState({ showAllWordsButton: false });
    const res = await axios.get(
      `https://api.vocya.hetorus.nl/word/course/${course}`
    );
    this.setState({ words: res.data, loading: false });
  };

  // search for words via the vocya API
  searchCourseWords = async (course, text, searchWordOnly) => {
    this.setState({ loading: true });
    this.setState({ showAllWordsButton: true });
    const res = await axios.get(
      `https://api.vocya.hetorus.nl/course/${course}/search/word/${
        searchWordOnly ? "romaji,dutch,hiragana,kanji" : "*"
      }/${text}`
    );
    this.setState({ words: res.data, loading: false });
  };

  // get a single word via the vocya API
  getWord = async (id) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.vocya.hetorus.nl/word/id/${id}`);
    this.setState({ word: res.data[0], loading: false });
  };

  // show an alert
  setAlert = (msg, type) => {
    // store the msg and type information in alert object in state
    this.setState({ alert: { msg, type } });
    // if the timeout was already set, unset the timeout to reset it to the full period
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID);
    }
    // set the timeout and store the timeout ID
    this.timeoutID = setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { words, word, loading, showAllWordsButton } = this.state;

    return (
      <Router>
        <div
          className="App"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar loading={loading} />
          <CacheBuster>
            {({
              loading,
              isLatestVersion,
              currentVersion,
              latestVersion,
              refreshCacheAndReload,
            }) => {
              if (!loading && !isLatestVersion) {
                return (
                  <div
                    style={{
                      color: "var(--danger-color)",
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: "1em",
                    }}
                    onClick={refreshCacheAndReload}
                  >
                    There is a new version of the vocya dashboard available!
                    <br />
                    You are using {currentVersion} and {latestVersion} is
                    available.
                    <br /> Click on this message to reload the window. <br />
                    If this doesn't work try pressing Ctrl+F5 to force refresh
                  </div>
                );
              }
              return null;
            }}
          </CacheBuster>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <div className="container">
                  <Fragment>
                    <Search
                      searchWords={this.searchWords}
                      showAllWords={this.showAllWords}
                      showAllWordsButton={showAllWordsButton}
                      setAlert={this.setAlert}
                    />
                    <Words loading={loading} words={words} />
                  </Fragment>
                </div>
              )}
            />
            <Route
              exact
              path="/course/:course"
              render={(props) => (
                <div className="container">
                  <Fragment>
                    <Search
                      course={props.course}
                      searchWords={this.searchCourseWords}
                      showAllWords={this.showAllCourseWords}
                      showAllWordsButton={showAllWordsButton}
                      setAlert={this.setAlert}
                    />
                    <Words loading={loading} words={words} />
                  </Fragment>
                </div>
              )}
            />
            <Route
              exact
              path="/word/id/:id"
              render={(props) => (
                <div className="container">
                  <Word
                    {...props}
                    getWord={this.getWord}
                    word={word}
                    loading={loading}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/table/hiragana"
              render={(props) => (
                <img
                  src="/kana-tables/hiragana-dark.png"
                  className="img-fill"
                  alt="hiragana table"
                />
              )}
            />
            <Route
              exact
              path="/table/katakana"
              render={(props) => (
                <img
                  src="/kana-tables/katakana-dark.png"
                  className="img-fill"
                  alt="katakana table"
                />
              )}
            />
            <Route
              exact
              path="/about"
              render={(props) => (
                <div className="container">
                  <About />
                </div>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
