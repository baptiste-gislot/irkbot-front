import React from "react";

const Question = (props) => {
  return (
    <React.Fragment>
      <p>{props.question.id}</p>
      <p>{props.question.topic}</p>
      <p>{props.question.question}</p>
      <p>{props.question.answer}</p>
    </React.Fragment>
  );
};

export default Question;
