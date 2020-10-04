import React, { useReducer } from "react";
import "./App.css";
import Answers from "./components/Answers";
import Progress from "./components/Progress";
import Question from "./components/Question";
import { quizReducer, initialState } from "./reducers/quizReducer";
import QuizContext from "./context/QuizContext";
import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_ANSWERS,
  SET_ERRORS,
  SET_SHOW_RESULTS,
  SET_ENTER_GAME,
} from "./reducers/types";
import Results from "./components/Results";
import StartGame from "./components/StartGame";

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const {
    userName,
    questionsNumber,
    enterGame,
    questions,
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    errors,
  } = state;

  const question = questions[currentQuestion];
  const username = localStorage.getItem("userName");

  console.log(username);

  const renderError = () => {
    if (!errors || !errors.selectChoice) {
      return;
    }
    return <div className="error">{errors.selectChoice}</div>;
  };

  const next = () => {
    const answer = { questionId: question.questionId, answer: currentAnswer };

    if (!currentAnswer) {
      dispatch({
        type: SET_ERRORS,
        errors: { selectChoice: "Please select an option" },
      });
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

  //handle take username to start play
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors || !errors.userName) {
      localStorage.setItem("userName", userName);
      dispatch({ type: SET_ENTER_GAME, enterGame: true });
    }
  };

  const handleQuit = () => {
    localStorage.removeItem("userName");
    dispatch({ type: SET_ENTER_GAME, enterGame: false });
  };

  if (!enterGame && !username) {
    console.log(userName, questionsNumber);
    return (
      <StartGame
        state={state}
        dispatch={dispatch}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (showResults) {
    return (
      <Results questions={questions} answers={answers} dispatch={dispatch} />
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
            <button onClick={handleQuit}>Quit the game</button>
          </div>
        </div>
      </QuizContext.Provider>
    );
  }
}

export default App;
