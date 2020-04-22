import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
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
  const [show, setShow] = useState(false);
  const [currentQ, setCurrentQ] = useState({});

  const handleClose = () => setShow(false);
  const handleSave = async () => {
    await axios
      .patch(`${apiUrl}:${apiPort}/questions/${currentQ.id}`, {
        topic: currentQ.topic,
        question: currentQ.question,
        answer: currentQ.answer,
      })
      .then((res, err) => {
        if (err) {
          throw err;
        }
        console.log(res);
      });
    getData(start);
    setShow(false);
  };
  const handleShow = (question) => {
    setCurrentQ(question);
    setShow(true);
  };

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

  const deleteQ = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/questions/${id}`)
      .then((res, err) => {
        if (err) {
          throw err;
        }
        console.log(res);
      });
    getData(start);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "topic":
        const topic = { ...currentQ, topic: e.target.value };
        setCurrentQ(topic);
        break;
      case "question":
        const question = { ...currentQ, question: e.target.value };
        setCurrentQ(question);
        break;
      case "answer":
        const answer = { ...currentQ, answer: e.target.value };
        setCurrentQ(answer);
        break;
      default:
        break;
    }
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
                index={question.id}
                deleteQ={deleteQ}
                showQ={handleShow}
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Question # {currentQ.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="topic">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                placeholder="topic"
                value={currentQ.topic}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="question"
                value={currentQ.question}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="answer"
                value={currentQ.answer}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Dashboard;
