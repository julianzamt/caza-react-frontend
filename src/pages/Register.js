import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { errorMessages } from "../utils/feedbackMessages";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const context = useContext(AppContext);

  async function createUser() {
    try {
      setFeedback("");
      if (password !== confirmation) {
        return setFeedback(errorMessages.MISMATCHERROR);
      }
      setIsLoading(true);
      const newUser = {
        username: username,
        password: password,
        secretKey: secretKey,
      };

      await axios.post("http://localhost:5000/users/register", newUser);
      const response = await axios.post("http://localhost:5000/users/", { username, password });
      setIsLoading(false);
      context.loginUser(username, response.data.token);
    } catch (e) {
      if (e.response) {
        console.log(e.response);
        setFeedback(e.response.data.message);
      } else {
        console.log(e);
        setFeedback(errorMessages.NO_CONNECTION);
      }
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "secret-key") {
      setSecretKey(value);
    } else if (name === "confirmation") {
      setConfirmation(value);
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    createUser();
  }

  return (
    <div className="register__container">
      <h1 className="register__title">Admin Registro</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name="password" value={password} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirmation</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" name="confirmation" value={confirmation} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Secret Key</Form.Label>
          <Form.Control type="password" placeholder="Enter Secret Key" name="secret-key" value={secretKey} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" variant="secondary" size="sm">
          Register {isLoading && <Spinner animation="border" variant="info" className="ml-3" />}
        </Button>
      </Form>
      {feedback && <div className="register__error">{feedback}</div>}
      <Link to="/admin/login" className="mt-4 text-decoration-none text-reset">
        <p style={{ fontSize: "0.9em", borderTop: "1px solid lightgray", paddingTop: "1em" }}>Ya tenés cuenta? Logueate acá</p>
      </Link>
    </div>
  );
};

export default Register;
