import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Question from "./Question";

const apiUrl = "http://127.0.0.1";
const apiPort = "8000";

const buttonStyle = {
  margin: "5px",
};

const Dashboard = () => {
  const [start, setStart] = useState(0);
  const [gap, setGap] = useState(15);
  const [questions, setQuestions] = useState([]);

  const getData = (pagination) => {
    axios
      .get(`${apiUrl}:${apiPort}/questions?start=${pagination}&gap=${gap}`)
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        setQuestions(res.data);
      });
  };

  const handlePrevious = () => {
    if (start >= 15) {
      setStart(start - gap);
    } else {
      setStart(0);
    }
    getData(start - gap);
  };

  const handleNext = () => {
    setStart(start + gap);
    getData(start + gap);
  };

  useEffect(() => {
    getData(0);
  }, []);

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Topic</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            return (
              <Question
                question={question}
                key={index}
                index={index}
                setData={() => setQuestions()}
              />
            );
          })}
        </tbody>
      </Table>
      <div>
        <Button variant="primary" style={buttonStyle} onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="primary" style={buttonStyle} onClick={handleNext}>
          Next
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
