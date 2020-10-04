import React from "react";
import { validateProperty } from "../helpers/validateName";
import {
  SET_ENTER_GAME,
  SET_QUESTIONS_NUMBERS,
  SET_USERNAME,
  SET_ERRORS,
} from "../reducers/types";

function StartGame({ dispatch, state, handleSubmit }) {
  const { questionsNumber, userName, errors } = state;

  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "userName") {
      const errorMessage = validateProperty(input);
      if (errorMessage) {
        dispatch({ type: SET_ERRORS, errors: { userName: errorMessage } });
      } else {
        dispatch({ type: SET_ERRORS, errors: {} });
      }
      dispatch({ type: SET_USERNAME, userName: input.value });
    }
    if (input.name === "questionsNumber")
      dispatch({ type: SET_QUESTIONS_NUMBERS, questionsNumber: input.value });
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h2>username</h2>
        <input
          name="userName"
          type="text"
          value={userName}
          onChange={handleChange}
          autoFocus
        />
        {errors.userName && <p>{errors.userName}</p>}
        <h2>Number of questions</h2>
        <input
          name="questionsNumber"
          type="number"
          value={questionsNumber}
          onChange={handleChange}
        />
        {errors.questionsNumber && <p>{errors.questionsNumber}</p>}
        <button type="submit" className="btn btn-primary d-block mx-auto mt-4">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default StartGame;
