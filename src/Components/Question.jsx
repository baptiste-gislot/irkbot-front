import React from "react";

const imgStyle = {
  width: "20px",
  margin: "0 5px",
  cursor: "pointer",
};

const Question = (props) => {
  return (
    <tr>
      <td>{props.question.id}</td>
      <td>{props.question.topic}</td>
      <td>{props.question.question}</td>
      <td>{props.question.answer}</td>
      <td>
        <img
          src="/edit.svg"
          style={imgStyle}
          alt="edit"
          onClick={() =>
            props.showQ({
              id: props.index,
              topic: props.question.topic,
              question: props.question.question,
              answer: props.question.answer,
            })
          }
        ></img>
        <img
          src="/delete.svg"
          style={imgStyle}
          alt="delete"
          onClick={() => props.deleteQ(props.index)}
        ></img>
      </td>
    </tr>
  );
};

export default Question;
