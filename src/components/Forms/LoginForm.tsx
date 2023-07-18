import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { setLoader } from "@/redux/LoaderSlice";
import { toast } from "react-toastify";
import { useUserActions } from "../../hooks/user.actions";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    dispatch(setLoader(true));
    userActions.login(data).catch((err) => {
      if (!err.message) {
        toast.error("login Success");
        dispatch(setLoader(false));
      }
      if (err.message) {
        setError(err.request.response);
        toast.error("Something went wrong");
        dispatch(setLoader(false));
      }
    });
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
