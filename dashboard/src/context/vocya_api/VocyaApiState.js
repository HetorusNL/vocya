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
import { apiCourse, apiCourses } from "../../components/utils/VocyaAPI";

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
    alert: null,
  };

  const [state, dispatch] = useReducer(vocyaApiReducer, initialState);

  // get courses
  const getCourses = async () => {
    setLoading();
    setIsSearching(false);
    const res = await apiCourses();
    dispatch({ type: GET_COURSES, payload: res.data });
  };

  // get course
  const getCourse = async (co_id) => {
    setLoading();
    setIsSearching(false);
    const res = await apiCourse(co_id);
    console.log(res);
    dispatch({ type: GET_COURSE, payload: res.data[0] });
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
        loading: state.loading,
        isSearching: state.isSearching,
        getCourses,
        getCourse,
        setIsSearching,
      }}
    >
      {props.children}
    </VocyaApiContext.Provider>
  );
};

export default VocyaApiState;
