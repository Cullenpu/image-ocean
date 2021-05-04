import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, FormGroup, Input } from "reactstrap";
import { checkSession, handleLogin, handleSignup } from "../utils";

import "./loginStyles.css";

const Login = ({ setID }) => {
  const [infoText, setInfoText] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkSession(setID);
  }, []);

  return (
    <div className="login-background">
      <div className="login-container">
        <Row className="login-row">
          <Col>TODO: Insert logo</Col>
          <Col>
            <Form className="login-form">
              <p className="login-text">Login, or Sign Up</p>
              <FormGroup>
                <Input
                  // type="username"
                  // name="username"
                  // id="login-username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  // name="password"
                  // id="login-password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button
                outline
                color="primary"
                className="button"
                onClick={() =>
                  handleLogin(username, password, setID, setInfoText)
                }
              >
                Login
              </Button>
              <Button
                outline
                color="secondary"
                className="button"
                onClick={() => handleSignup(username, password, setInfoText)}
              >
                Signup
              </Button>
              <h6>{infoText}</h6>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
