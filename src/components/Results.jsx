import React from "react";
import { RESET_QUIZ } from "../reducers/types";

function Results({ questions, answers, dispatch }) {
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

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  return (
    <div className="box result_box">
      <h2 className="m-auto">Results</h2>
      {rendeResults()}
      <button className="btn btn-primary mx-auto mt-3" onClick={restart}>
        Play Again
      </button>
    </div>
  );
}

export default Results;
