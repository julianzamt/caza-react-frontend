import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { errorMessages } from "../utils/errorMessages";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const context = useContext(AppContext);

  async function createUser() {
    try {
      setRegistrationError(false);
      setMismatchError(false);
      if (password !== confirmation) {
        return setMismatchError(true);
      }
      setIsLoading(true);
      const newUser = {
        username: username,
        password: password,
        confirmation: confirmation,
        secretKey: secretKey,
      };

      let response = await axios.post("http://localhost:5000/users/register", newUser);
      console.log(response);

      context.loginUser(username);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setRegistrationError(true);
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
      <h2 className="register__title">Registro</h2>
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
      <div className="register__error">
        {mismatchError && <span>{errorMessages.MISMATCHERROR}</span>}
        {registrationError && <span>{errorMessages.ERROR}</span>}
      </div>
    </div>
  );
};

export default Register;
