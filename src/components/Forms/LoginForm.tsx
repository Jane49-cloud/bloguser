import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "@/redux/auth";
import Loader from "@/Custom/CustomLoader";
import { AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error] = useState(null);
  const { isLoading } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginForm = event.currentTarget;

    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      email: form.email,
      password: form.password,
    };

    try {
      await dispatch(loginAction(data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {}
  };

  return (
    <Form
      id="registration-form"
      className="rounded border p-4"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      data-testid="login-form"
    >
      {isLoading && <Loader />}
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={form.email}
          data-testid="username-field"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="text"
          placeholder="Enter your email address"
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          data-testid="password-field"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-content text-danger">{error && <p>{error}</p>}</div>

      <Button
        disabled={!form.password || !form.email}
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
