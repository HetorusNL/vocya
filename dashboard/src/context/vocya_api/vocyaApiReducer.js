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

const vocyaApiReducer = (state, action) => {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, courses: action.payload, loading: false };
    case GET_COURSE:
      return { ...state, course: action.payload, loading: false };
    case GET_COURSE_CHAPTERS:
      return { ...state, chapters: action.payload, loading: false };
    case GET_COURSE_CHAPTER:
      return { ...state, chapter: action.payload, loading: false };
    case GET_COURSE_CHAPTER_WORDS:
      return { ...state };
    case GET_COURSE_CHAPTER_WORD:
      return { ...state };
    case GET_COURSE_WORDS:
      return { ...state };
    case GET_COURSE_WORD:
      return { ...state };
    case GET_CHAPTERS:
      return { ...state, chapters: action.payload, loading: false };
    case GET_CHAPTER:
      return { ...state, chapter: action.payload, loading: false };
    case GET_CHAPTER_WORDS:
      return { ...state };
    case GET_CHAPTER_WORD:
      return { ...state };
    case GET_WORDS:
      return { ...state };
    case GET_WORD:
      return { ...state };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_IS_SEARCHING:
      return { ...state, isSearching: action.payload };
    default:
      return state;
  }
};

export default vocyaApiReducer;
