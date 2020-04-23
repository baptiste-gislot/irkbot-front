import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Question from "./Question";

const apiUrl = "http://127.0.0.1";
const apiPort = "8000";

const buttonStyle = {
  margin: "5px",
};

const addBtn = {
  width: "50px",
  height: "50px",
  borderRadius: "35px",
  fontSize: "12px",
  textAlign: "center",
  position: "absolute",
  right: "50px",
  marginBottom: "20px",
};

const Dashboard = () => {
  const [start, setStart] = useState(0);
  const [gap, setGap] = useState(15);
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [currentQ, setCurrentQ] = useState({});

  const getData = (pagination) => {
    axios
      .get(`${apiUrl}:${apiPort}/questions?start=${pagination}&gap=${gap}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        setQuestions(res.data);
      });
  };

  const handleClose = () => setShow(false);
  const handleEdit = async () => {
    await axios
      .patch(
        `${apiUrl}:${apiPort}/questions/${currentQ.id}`,
        {
          topic: currentQ.topic,
          question: currentQ.question,
          answer: currentQ.answer,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res, err) => {
        if (err) throw err;
        console.log(res);
      });
    setShow(false);
    getData(start);
  };
  const handleShow = (question) => {
    setCurrentQ(question);
    setShow(true);
  };
  const deleteQ = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/questions/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res, err) => {
        if (err) throw err;
        console.log(res);
      });
    getData(start);
  };
  const handleCloseSave = () => setShowSave(false);
  const handleShowSave = () => setShowSave(true);
  const handleSave = async () => {
    await axios
      .post(
        `${apiUrl}:${apiPort}/questions`,
        {
          topic: currentQ.topic,
          question: currentQ.question,
          answer: currentQ.answer,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res, err) => {
        if (err) throw err;
        console.log(res);
      });
    setShowSave(false);
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
      <h1>IrkBot's Question Manager</h1>
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
        <Button variant="primary" style={addBtn} onClick={handleShowSave}>
          Add
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
                as="textarea"
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
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSave} onHide={handleCloseSave}>
        <Modal.Header closeButton>
          <Modal.Title>Add a question to the DB</Modal.Title>
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
          <Button variant="secondary" onClick={handleCloseSave}>
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
