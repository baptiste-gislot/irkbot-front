import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [emptyErr, setEmptyErr] = useState(false);
  const [logErr, setLogErr] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "login") {
      setLogin(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = async () => {
    if (login && password) {
      await axios
        .post(`http://127.0.0.1:3000/login`, {
          username: login,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          props.isLogged(true);
        })
        .catch((err) => {
          console.log(err);
          setLogErr(true);
        });
    } else {
      setEmptyErr(true);
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper fadeInDown" id="form">
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src="https://cdn.5euros.com/media/cache/carousel/uploads/media/picture/2019-01-09/670d4fdf-396c-48d7-ad52-c2499aedaea1.png"
              id="icon"
              alt="User Icon"
            />
          </div>
          <Form>
            <Form.Group controlId="login" className="fadeIn second">
              <Form.Label> Login or mail </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter login"
                value={login}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password" className="fadeIn third">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="btn btn-primary fadeIn fourth"
              id="submit"
              type="button"
              onClick={submit}
            >
              Login
            </Button>
          </Form>
        </div>
        <h4 style={{ color: "red" }}>
          {emptyErr ? "Login and password should be filled" : null}
        </h4>
        <h4 style={{ color: "red" }}>
          {logErr ? "Login and password don't match" : null}
        </h4>
      </div>
    </React.Fragment>
  );
};

export default Login;
