import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useUserActions } from "../../hooks/user.actions";

function RegistrationForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const data = {
      password: form.password,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      bio: form.bio,
    };

    userActions.register(data).catch((err) => {
      if (err.message) {
        setError(err.request.response);
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
      data-testid="register-form"
    >
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={form.firstName}
          data-testid="first-name-field"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
          type="text"
          placeholder="Enter first name"
        />
        <Form.Control.Feedback type="invalid">
          This field is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={form.lastName}
          data-testid="last-name-field"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
          type="text"
          placeholder="Enter last name"
        />
        <Form.Control.Feedback type="invalid">
          This field is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          value={form.email}
          data-testid="email-field"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
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
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          value={form.bio}
          data-testid="bio-field"
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          as="textarea"
          rows={3}
          placeholder="A simple bio... (Optional)"
        />
      </Form.Group>

      <div className="text-content text-danger">{error && <p>{error}</p>}</div>

      <Button data-testid="submit-button" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegistrationForm;
