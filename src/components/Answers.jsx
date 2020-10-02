import React, { useContext } from "react";
import Answer from "./Answer";
import { lettersFun } from "../helpers/helpers";
import QuizContext from "../context/QuizContext";

function Answers() {
  const { state, dispatch } = useContext(QuizContext);
  const { currentAnswer, currentQuestion, questions } = state;
  const question = questions[currentQuestion];

  return (
    <div className="answer__box">
      {question?.answers.map((answer, i) => (
        <Answer
          key={i}
          letter={lettersFun(i)}
          answer={answer}
          selected={currentAnswer === answer}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default Answers;
