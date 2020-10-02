import questions from "../questions/questions";
import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ANSWERS,
  SET_ERROR,
  RESET_QUIZ,
  SET_SHOW_RESULTS,
} from "../reducers/types";

export const initialState = {
  questions,
  currentQuestion: 0,
  currentAnswer: "",
  answers: [],
  showResults: false,
  error: "",
};

export function quizReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.currentAnswer,
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.answers,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.showResults,
      };
    case RESET_QUIZ:
      return {
        ...state,
        answers: [],
        currentAnswer: "",
        currentQuestion: 0,
        showResults: false,
        error: "",
      };
    default:
      return state;
  }
}
