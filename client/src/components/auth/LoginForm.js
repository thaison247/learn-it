import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function LoginForm() {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Router
  const history = useHistory();

  // Local state
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { username, password } = loginForm;

  const onChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);
      if (loginData.success) {
        history.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register" className="ml-2">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
