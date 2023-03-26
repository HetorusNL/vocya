import React, { Fragment, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import VocyaApiContext from "./context/vocya_api/VocyaApiContext";
import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import CacheBuster from "./components/utils/CacheBuster";
import Search from "./components/utils/Search";
import Course from "./components/courses/Course";
import Courses from "./components/courses/Courses";
import Chapter from "./components/chapters/Chapter";
import Chapters from "./components/chapters/Chapters";
import Word from "./components/words/Word";
import Words from "./components/words/Words";

const App = () => {
  const vocyaApiContext = useContext(VocyaApiContext);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [alert, setAlert] = useState(null);

  const performSearch = async (
    text,
    searchWordOnly,
    searchWordOnlyKeys,
    exactMatch,
    items
  ) => {
    vocyaApiContext.setLoading(true);
    vocyaApiContext.setIsSearching(true);
    var filteredItems = [];
    let textLowerSplit = text.toLowerCase().split(/[\s/]+/);
    items.forEach((item) => {
      let res = textLowerSplit.every((splittedText) => {
        return Object.entries(item).some(([key, value]) => {
          if (searchWordOnly && !searchWordOnlyKeys.includes(key)) return false;
          if (exactMatch) {
            let valueLowerSplit = value.toLowerCase().split(/[\s/]+/);
            return valueLowerSplit.some((splittedValue) => {
              return (
                splittedValue.replace(/[(),;.]/g, "") ===
                splittedText.replace(/[(),;.]/g, "")
              );
            });
          } else {
            return value.toLowerCase().includes(splittedText);
          }
        });
      });
      res && filteredItems.push(item);
    });
    return filteredItems;
  };

  // perform the course search locally instead of via the API
  const searchCourse = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["abbreviation", "name"];
    let items = vocyaApiContext.courses;
    let filtered = await performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    vocyaApiContext.setIsSearching(true);
    setFilteredCourses(filtered);
    vocyaApiContext.setLoading(false);
  };

  // perform the chapter search locally instead of via the API
  const searchChapter = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["id", "name"];
    let items = vocyaApiContext.chapters;
    let filtered = await performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    vocyaApiContext.setIsSearching(true);
    setFilteredChapters(filtered);
    vocyaApiContext.setLoading(false);
  };

  // perform the word search locally instead of via the API
  const searchWord = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["dutch", "hiragana", "nihongo", "romaji"];
    let items = vocyaApiContext.words;
    let filtered = await performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    vocyaApiContext.setIsSearching(true);
    setFilteredWords(filtered);
    vocyaApiContext.setLoading(false);
  };

  const [timeoutId, setTimeoutId] = useState(null);
  // show an alert
  const showAlert = (msg, type) => {
    // store the msg and type information in alert object in state
    setAlert({ msg, type });
    // if the timeout was already set, unset the timeout to reset it to the full period
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    // set the timeout and store the timeout ID
    setTimeoutId(
      setTimeout(() => {
        setAlert(null);
      }, 5000)
    );
  };

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
        <Navbar />
        <CacheBuster>
          {({
            cacheBusterLoading,
            isLatestVersion,
            currentVersion,
            latestVersion,
            refreshCacheAndReload,
          }) => {
            if (!cacheBusterLoading && !isLatestVersion) {
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
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path={["/", "/words"]}
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Search
                    itemName="words"
                    searchItems={searchWord}
                    showAllItems={vocyaApiContext.getWords}
                    setAlert={showAlert}
                  />
                  <Words
                    words={
                      vocyaApiContext.isSearching
                        ? filteredWords
                        : vocyaApiContext.words
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/courses"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Search
                    itemName="courses"
                    searchItems={searchCourse}
                    showAllItems={vocyaApiContext.getCourses}
                    setAlert={showAlert}
                  />
                  <Courses
                    courses={
                      vocyaApiContext.isSearching
                        ? filteredCourses
                        : vocyaApiContext.courses
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route exact path="/course/:co_id" component={Course} />
          <Route
            exact
            path="/course/:co_id/chapters"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Link to={`../../courses`} className="btn">
                    Back to Courses
                  </Link>
                  <Link to={`../${props.match.params.co_id}`} className="btn">
                    Back to Course
                  </Link>
                  <Search
                    itemName="chapters"
                    searchItems={searchChapter}
                    showAllItems={vocyaApiContext.getCourseChapters}
                    showAllItemsArgs={{ co_id: props.match.params.co_id }}
                    setAlert={showAlert}
                  />
                  <Chapters
                    chapters={
                      vocyaApiContext.isSearching
                        ? filteredChapters
                        : vocyaApiContext.chapters
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/course/:co_id/chapter/:ch_id"
            component={Chapter}
          />
          <Route
            exact
            path="/course/:co_id/chapter/:ch_id/words"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Link to={`../../chapters`} className="btn">
                    Back to Chapters
                  </Link>
                  <Link to={`../${props.match.params.ch_id}`} className="btn">
                    Back to Chapter
                  </Link>
                  <Search
                    itemName="words"
                    searchItems={searchWord}
                    showAllItems={vocyaApiContext.getCourseChapterWords}
                    showAllItemsArgs={{
                      co_id: props.match.params.co_id,
                      ch_id: props.match.params.ch_id,
                    }}
                    setAlert={showAlert}
                  />
                  <Words
                    words={
                      vocyaApiContext.isSearching
                        ? filteredWords
                        : vocyaApiContext.words
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/course/:co_id/chapter/:ch_id/word/:wo_id"
            component={Word}
          />
          <Route
            exact
            path="/course/:co_id/words"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Link to={`../../courses`} className="btn">
                    Back to Courses
                  </Link>
                  <Link to={`../${props.match.params.co_id}`} className="btn">
                    Back to Course
                  </Link>
                  <Search
                    itemName="words"
                    searchItems={searchWord}
                    showAllItems={vocyaApiContext.getCourseWords}
                    showAllItemsArgs={{
                      co_id: props.match.params.co_id,
                    }}
                    setAlert={showAlert}
                  />
                  <Words
                    words={
                      vocyaApiContext.isSearching
                        ? filteredWords
                        : vocyaApiContext.words
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route exact path="/course/:co_id/word/:wo_id" component={Word} />
          <Route
            exact
            path="/chapters"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Search
                    itemName="chapters"
                    searchItems={searchChapter}
                    showAllItems={vocyaApiContext.getChapters}
                    setAlert={showAlert}
                  />
                  <Chapters
                    chapters={
                      vocyaApiContext.isSearching
                        ? filteredChapters
                        : vocyaApiContext.chapters
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route exact path="/chapter/:ch_id" component={Chapter} />
          <Route
            exact
            path="/chapter/:ch_id/words"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Link to={`../../chapters`} className="btn">
                    Back to Chapters
                  </Link>
                  <Link to={`../${props.match.params.ch_id}`} className="btn">
                    Back to Chapter
                  </Link>
                  <Search
                    itemName="words"
                    searchItems={searchWord}
                    showAllItems={vocyaApiContext.getChapterWords}
                    showAllItemsArgs={{ ch_id: props.match.params.ch_id }}
                    setAlert={showAlert}
                  />
                  <Words
                    words={
                      vocyaApiContext.isSearching
                        ? filteredWords
                        : vocyaApiContext.words
                    }
                  />
                </Fragment>
              </div>
            )}
          />
          <Route exact path="/chapter/:ch_id/word/:wo_id" component={Word} />
          <Route exact path="/word/:wo_id" component={Word} />
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
};

export default App;
