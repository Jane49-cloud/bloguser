import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

import { useUserActions } from "../../hooks/user.actions";

interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: File | null;
}

function RegistrationForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
    profilePicture: null,
  });
  const [error, setError] = useState<string | null>(null);
  const userActions = useUserActions();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Submit");

    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const data = new FormData();
    data.append("password", form.password);
    data.append("email", form.email);
    data.append("firstName", form.firstName);
    data.append("lastName", form.lastName);
    data.append("bio", form.bio);
    if (form.profilePicture) {
      data.append("picture", form.profilePicture);
      data.append("profilePicture", form.profilePicture?.name);
    }

    userActions.register(data).catch((err: any) => {
      if (err.message) {
        setError(err.request.response);
      }
    });
  };

  const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setForm({ ...form, profilePicture: file });
    }
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
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          required
          data-testid="picture-path-field"
        />
        <Form.Control.Feedback type="invalid">
          This field is required.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="row">
        <Form.Group className="col-md-5">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={form.firstName}
            data-testid="first-name-field"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, firstName: e.target.value })
            }
            required
            type="text"
            placeholder="Enter first name"
          />
          <Form.Control.Feedback type="invalid">
            This field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="col-md-5 mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={form.lastName}
            data-testid="last-name-field"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
            type="text"
            placeholder="Enter last name"
          />
          <Form.Control.Feedback type="invalid">
            This field is required.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          value={form.email}
          data-testid="email-field"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: e.target.value })
          }
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value })
          }
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
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setForm({ ...form, bio: e.target.value })
          }
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
