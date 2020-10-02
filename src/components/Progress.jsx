import React from "react";

function Progress({ total, current }) {
  return (
    <h3>
      Question {current} of {total}
    </h3>
  );
}

export default Progress;
