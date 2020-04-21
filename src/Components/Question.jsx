import React from "react";
import axios from "axios";

const imgStyle = {
  width: "20px",
  margin: "0 5px",
  cursor: "pointer",
};

const Question = (props) => {
  const deleteQ = (id) => {
    axios.delete(`http://127.0.0.1:8000/questions/${id}`).then((res, err) => {
      if (err) {
        throw err;
      }
    });
  };

  return (
    <tr>
      <td>{props.question.id}</td>
      <td>{props.question.topic}</td>
      <td>{props.question.question}</td>
      <td>{props.question.answer}</td>
      <td>
        <img src="/edit.svg" style={imgStyle} alt="edit"></img>
        <img
          src="/delete.svg"
          style={imgStyle}
          alt="delete"
          onClick={() => deleteQ(props.index)}
        ></img>
      </td>
    </tr>
  );
};

export default Question;
