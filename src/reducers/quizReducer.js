import questions from "../questions/questions";
import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ANSWERS,
  SET_ERRORS,
  RESET_QUIZ,
  SET_SHOW_RESULTS,
  SET_USERNAME,
  SET_QUESTIONS_NUMBERS,
  SET_ENTER_GAME,
} from "../reducers/types";

export const initialState = {
  userName: "",
  questions,
  currentQuestion: 0,
  currentAnswer: "",
  answers: [],
  showResults: false,
  enterGame: false,
  questionsNumber: 5,
  errors: {},
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
    case SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.showResults,
      };
    case SET_USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    case SET_QUESTIONS_NUMBERS:
      return {
        ...state,
        questionsNumber: action.questionsNumber,
      };
    case SET_ENTER_GAME:
      return {
        ...state,
        enterGame: action.enterGame,
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
