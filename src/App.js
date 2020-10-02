import React, { useReducer } from "react";
import "./App.css";
import Answers from "./components/Answers";
import Progress from "./components/Progress";
import Question from "./components/Question";
import questions from "./questions/questions";
import { quizReducer, initialState } from "./reducers/quizReducer";
import QuizContext from "./context/QuizContext";
import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ANSWERS,
  SET_ERROR,
  RESET_QUIZ,
  SET_SHOW_RESULTS,
} from "./reducers/types";

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const {
    questions,
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    error,
  } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct === answer.answer) {
      return <span className="answer__correct">Correct</span>;
    }
    return <span className="answer__wrong">Wrong</span>;
  };

  const rendeResults = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.questionId === answer.questionId
      );

      return (
        <div key={question.questionId}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const next = () => {
    const answer = { questionId: question.questionId, answer: currentAnswer };

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: "Please select an option" });
      return;
    }

    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }
    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  if (showResults) {
    return (
      <div className="box result_box">
        <h2 className="m-auto">Results</h2>
        {rendeResults()}
        <button className="btn btn-primary mx-auto mt-3" onClick={restart}>
          Play Again
        </button>
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <div className="box">
          <div>
            <Progress total={questions.length} current={currentQuestion + 1} />
            <Question question={question.question} />
            {renderError()}
            <Answers />
            <button className="btn btn-primary m-auto" onClick={next}>
              Confirm and Continue
            </button>
          </div>
        </div>
      </QuizContext.Provider>
    );
  }
}

export default App;
