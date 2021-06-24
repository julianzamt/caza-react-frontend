import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { errorMessages } from "../utils/errorMessages";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("banana");
    }, 500);
  }

  return (
    <div className="login__container">
      <h1 style={{ marginBottom: "1em" }}>Admin login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name="password" value={password} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="secondary">
          Login {isLoading && <Spinner animation="border" className="ml-3" size="sm" />}
        </Button>
      </Form>
      {feedback && <p>{feedback}</p>}
      <Link to="/admin/register" className="mt-4 text-decoration-none text-reset">
        <p style={{ fontSize: "0.9em", borderTop: "1px solid lightgray", paddingTop: "1em" }}>Crear una cuenta de administrador</p>
      </Link>
    </div>
  );
};

export default Login;
