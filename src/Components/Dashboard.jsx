import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";

const apiUrl = "http://127.0.0.1";
const apiPort = "8000";
const start = 0;
const gap = 15;

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}:${apiPort}/questions?start=${start}&gap=${gap}`)
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        setQuestions(res.data);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      {questions.map((question) => {
        return <Question question={question} />;
      })}
    </React.Fragment>
  );
};

export default Dashboard;
