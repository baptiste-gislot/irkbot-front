import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

const Login = () => {
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
              <Form.Control type="text" placeholder="Enter login" />
            </Form.Group>
            <Form.Group controlId="password" className="fadeIn third">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Enter password" />
            </Form.Group>
            <Button
              variant="primary"
              className="btn btn-primary fadeIn fourth"
              id="submit"
              type="button"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
