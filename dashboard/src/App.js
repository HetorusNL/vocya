import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
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

  // initially search for the first X users by their id when the page loads
  async componentDidMount() {
    this.setState({ showAllWordsButton: false });
    await this.showAllWords();
  }

  showAllWords = async () => {
    this.setState({ loading: true });
    this.setState({ showAllWordsButton: false });
    const res = await axios.get(`https://api.vocya.hetorus.nl/words`);
    this.setState({ words: res.data, loading: false });
  };

  // search github users via the github api
  searchWords = async (text) => {
    this.setState({ loading: true });
    this.setState({ showAllWordsButton: true });
    const res = await axios.get(
      `https://api.vocya.hetorus.nl/search/word/${text}`
    );
    this.setState({ words: res.data, loading: false });
  };

  // get a single user via the github api
  getWord = async (id) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.vocya.hetorus.nl/word/id/${id}`);
    console.log(res);
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
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchWords={this.searchWords}
                      showAllWords={this.showAllWords}
                      showAllWordsButton={showAllWordsButton}
                      setAlert={this.setAlert}
                    />
                    <Words loading={loading} words={words} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/word/id/:id"
                render={(props) => (
                  <Word
                    {...props}
                    getWord={this.getWord}
                    word={word}
                    loading={loading}
                  />
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
