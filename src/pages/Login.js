import Form from 'react-bootstrap/Form'
import { useState } from "react"
import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        if (name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    return (
        <div className="login__container">
            <h1 style={{ marginBottom: "1em" }}>Login</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={password} onChange={handleChange} />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login