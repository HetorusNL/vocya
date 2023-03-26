import { useReducer } from "react";
import vocyaApiReducer from "./vocyaApiReducer";
import VocyaApiContext from "./VocyaApiContext";
import {
  GET_COURSES,
  GET_COURSE,
  GET_COURSE_CHAPTERS,
  GET_COURSE_CHAPTER,
  GET_COURSE_CHAPTER_WORDS,
  GET_COURSE_CHAPTER_WORD,
  GET_COURSE_WORDS,
  GET_COURSE_WORD,
  GET_CHAPTERS,
  GET_CHAPTER,
  GET_CHAPTER_WORDS,
  GET_CHAPTER_WORD,
  GET_WORDS,
  GET_WORD,
  SET_LOADING,
  SET_IS_SEARCHING,
} from "../types";
import {
  apiChapter,
  apiChapters,
  apiCourse,
  apiCourseChapter,
  apiCourseChapters,
  apiCourses,
} from "../../components/utils/VocyaAPI";

const VocyaApiState = (props) => {
  const initialState = {
    courses: [],
    course: {},
    chapters: [],
    chapter: {},
    words: [],
    word: {},
    loading: false,
    isSearching: false,
  };

  const [state, dispatch] = useReducer(vocyaApiReducer, initialState);

  // get courses
  const getCourses = async () => {
    setupPageForNewContent();
    const res = await apiCourses();
    dispatch({ type: GET_COURSES, payload: res.data });
  };

  // get course
  const getCourse = async ({ co_id }) => {
    setupPageForNewContent();
    const res = await apiCourse(co_id);
    console.log(res);
    dispatch({ type: GET_COURSE, payload: res.data[0] });
  };

  // get course chapters
  const getCourseChapters = async ({ co_id }) => {
    setupPageForNewContent();
    const res = await apiCourseChapters(co_id);
    dispatch({ type: GET_COURSE_CHAPTERS, payload: res.data });
  };

  // get course chapter
  const getCourseChapter = async ({ co_id, ch_id }) => {
    setupPageForNewContent();
    const res = await apiCourseChapter(co_id, ch_id);
    dispatch({ type: GET_COURSE_CHAPTER, payload: res.data[0] });
  };

  // get chapters
  const getChapters = async () => {
    setupPageForNewContent();
    const res = await apiChapters();
    dispatch({ type: GET_CHAPTERS, payload: res.data });
  };

  // get chapter
  const getChapter = async ({ ch_id }) => {
    setupPageForNewContent();
    const res = await apiChapter(ch_id);
    dispatch({ type: GET_CHAPTER, payload: res.data[0] });
  };

  // setup page for new content, clearing loading and is searching
  const setupPageForNewContent = () => {
    setLoading();
    setIsSearching(false);
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // set is searching
  const setIsSearching = (isSearching) =>
    dispatch({ type: SET_IS_SEARCHING, payload: isSearching });

  return (
    <VocyaApiContext.Provider
      value={{
        courses: state.courses,
        course: state.course,
        chapters: state.chapters,
        chapter: state.chapter,
        loading: state.loading,
        isSearching: state.isSearching,
        getCourses,
        getCourse,
        getCourseChapters,
        getCourseChapter,
        getChapters,
        getChapter,
        setIsSearching,
      }}
    >
      {props.children}
    </VocyaApiContext.Provider>
  );
};

export default VocyaApiState;
