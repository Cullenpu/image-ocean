import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import "./loginStyles.css";

import ENV from "../config";
const API_HOST = ENV.api_host;

const Login = ({ setLoggedIn }) => {
  const [infoText, setInfoText] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkSession(setLoggedIn);
  }, []);

  const checkSession = (setLoggedIn) => {
    const url = `${API_HOST}/users/check-session`;
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200 && res.data.id) {
          console.log("User logged in!");
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log("User not logged in");
        setLoggedIn(false);
      });
  };

  const handleLogin = () => {
    const loginInfo = { username: username, password: password };
    axios
      .post(`${API_HOST}/users/login`, loginInfo)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((err) => {
        setInfoText("Invalid credentials");
      });
  };

  const handleSignup = () => {
    const signupInfo = { username: username, password: password };
    axios
      .post(`${API_HOST}/users`, signupInfo)
      .then((res) => {
        setInfoText("User created!");
      })
      .catch((err) => {
        setInfoText("Use different username.");
      });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <Row className="login-row">
          <Col>TODO: Insert logo</Col>
          <Col>
            <Form className="login-form">
              <h2>User Login</h2>
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
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                outline
                color="secondary"
                className="button"
                onClick={handleSignup}
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
