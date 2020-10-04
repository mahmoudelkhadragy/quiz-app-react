import React from "react";

import { SET_CURRENT_ANSWER, SET_ERRORS } from "../reducers/types";

function Answer({ letter, answer, selected, dispatch }) {
  let classes = ["answer__button"];

  if (selected) {
    classes.push("selected");
  }

  const handleClick = (answer) => {
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: answer });
    dispatch({ type: SET_ERRORS, errors: {} });
  };

  return (
    <button
      value={letter}
      className={classes.join(" ")}
      onClick={() => {
        handleClick(answer);
      }}
    >
      <span className="answer__letter">{letter}.</span> {answer}
    </button>
  );
}

export default Answer;
