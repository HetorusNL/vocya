import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

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
import {
  apiCourses,
  apiCourse,
  apiCourseChapters,
  apiCourseChapter,
  apiCourseChapterWords,
  apiCourseChapterWord,
  apiCourseWords,
  apiCourseWord,
  apiChapters,
  apiChapter,
  apiChapterWords,
  apiChapterWord,
  apiWords,
  apiWord,
} from "./components/utils/VocyaAPI";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [chapter, setChapter] = useState({});
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [word, setWord] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiCourses();
    setCourses(res.data);
    setLoading(false);
  };

  const getCourse = async ({ co_id }) => {
    setLoading(true);
    const res = await apiCourse(co_id);
    setCourse(res.data[0]);
    setLoading(false);
  };

  const getCourseChapters = async ({ co_id }) => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiCourseChapters(co_id);
    setChapters(res.data);
    setLoading(false);
  };

  const getCourseChapter = async ({ co_id, ch_id }) => {
    setLoading(true);
    const res = await apiCourseChapter(co_id, ch_id);
    setChapter(res.data[0]);
    setLoading(false);
  };

  const getCourseChapterWords = async ({ co_id, ch_id }) => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiCourseChapterWords(co_id, ch_id);
    setWords(res.data);
    setLoading(false);
  };

  const getCourseChapterWord = async ({ co_id, ch_id, wo_id }) => {
    setLoading(true);
    const res = await apiCourseChapterWord(co_id, ch_id, wo_id);
    setWord(res.data[0]);
    setLoading(false);
  };

  const getCourseWords = async ({ co_id }) => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiCourseWords(co_id);
    setWords(res.data);
    setLoading(false);
  };

  const getCourseWord = async ({ co_id, wo_id }) => {
    setLoading(true);
    const res = await apiCourseWord(co_id, wo_id);
    setWord(res.data[0]);
    setLoading(false);
  };

  const getChapters = async () => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiChapters();
    setChapters(res.data);
    setLoading(false);
  };

  const getChapter = async ({ ch_id }) => {
    setLoading(true);
    const res = await apiChapter(ch_id);
    setChapter(res.data[0]);
    setLoading(false);
  };

  const getChapterWords = async ({ ch_id }) => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiChapterWords(ch_id);
    setWords(res.data);
    setLoading(false);
  };

  const getChapterWord = async ({ ch_id, wo_id }) => {
    setLoading(true);
    const res = await apiChapterWord(ch_id, wo_id);
    setWord(res.data[0]);
    setLoading(false);
  };

  const getWords = async () => {
    setLoading(true);
    setIsSearching(false);
    const res = await apiWords();
    setWords(res.data);
    setLoading(false);
  };

  const getWord = async ({ wo_id }) => {
    setLoading(true);
    const res = await apiWord(wo_id);
    setWord(res.data[0]);
    setLoading(false);
  };

  const performSearch = async (
    text,
    searchWordOnly,
    searchWordOnlyKeys,
    exactMatch,
    items
  ) => {
    setLoading(true);
    setIsSearching(true);
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
    let items = courses;
    let filtered = await performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    setFilteredCourses(filtered);
    setLoading(false);
  };

  // perform the course search locally instead of via the API
  const searchChapter = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["id", "name"];
    let items = chapters;
    let filtered = await performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    setFilteredChapters(filtered);
    setLoading(false);
  };

  // perform the word search locally instead of via the API
  const searchWord = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["dutch", "hiragana", "nihongo", "romaji"];
    let items = words;
    let filtered = await performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    setFilteredWords(filtered);
    setLoading(false);
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
                    showAllItems={getWords}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Words
                    loading={loading}
                    words={isSearching ? filteredWords : words}
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
                    showAllItems={getCourses}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Courses
                    loading={loading}
                    courses={isSearching ? filteredCourses : courses}
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/course/:co_id"
            render={(props) => (
              <div className="container">
                <Course
                  {...props}
                  getCourse={getCourse}
                  course={course}
                  loading={loading}
                />
              </div>
            )}
          />
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
                    showAllItems={getCourseChapters}
                    showAllItemsArgs={{ co_id: props.match.params.co_id }}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Chapters
                    loading={loading}
                    chapters={isSearching ? filteredChapters : chapters}
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/course/:co_id/chapter/:ch_id"
            render={(props) => (
              <div className="container">
                <Chapter
                  {...props}
                  getChapter={getCourseChapter}
                  chapter={chapter}
                  loading={loading}
                />
              </div>
            )}
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
                    showAllItems={getCourseChapterWords}
                    showAllItemsArgs={{
                      co_id: props.match.params.co_id,
                      ch_id: props.match.params.ch_id,
                    }}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Words
                    loading={loading}
                    words={isSearching ? filteredWords : words}
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/course/:co_id/chapter/:ch_id/word/:wo_id"
            render={(props) => (
              <div className="container">
                <Word
                  {...props}
                  getWord={getCourseChapterWord}
                  word={word}
                  loading={loading}
                />
              </div>
            )}
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
                    showAllItems={getCourseWords}
                    showAllItemsArgs={{
                      co_id: props.match.params.co_id,
                    }}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Words
                    loading={loading}
                    words={isSearching ? filteredWords : words}
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/course/:co_id/word/:wo_id"
            render={(props) => (
              <div className="container">
                <Word
                  {...props}
                  getWord={getCourseWord}
                  word={word}
                  loading={loading}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/chapters"
            render={(props) => (
              <div className="container">
                <Fragment>
                  <Search
                    itemName="chapters"
                    searchItems={searchChapter}
                    showAllItems={getChapters}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Chapters
                    loading={loading}
                    chapters={isSearching ? filteredChapters : chapters}
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/chapter/:ch_id"
            render={(props) => (
              <div className="container">
                <Chapter
                  {...props}
                  getChapter={getChapter}
                  chapter={chapter}
                  loading={loading}
                />
              </div>
            )}
          />
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
                    showAllItems={getChapterWords}
                    showAllItemsArgs={{ ch_id: props.match.params.ch_id }}
                    isSearching={isSearching}
                    setAlert={showAlert}
                  />
                  <Words
                    loading={loading}
                    words={isSearching ? filteredWords : words}
                  />
                </Fragment>
              </div>
            )}
          />
          <Route
            exact
            path="/chapter/:ch_id/word/:wo_id"
            render={(props) => (
              <div className="container">
                <Word
                  {...props}
                  getWord={getChapterWord}
                  word={word}
                  loading={loading}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/word/:wo_id"
            render={(props) => (
              <div className="container">
                <Word
                  {...props}
                  getWord={getWord}
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
};

export default App;
