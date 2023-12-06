
import React, { useState } from "react";
import axios from "axios";
import { useUser } from './UserContext';



export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/homework3/Controller/RestApi/Login/login.php',
                {
                    username,
                    password,
                    login: 'login', // Add a parameter to indicate the login action
                }
            );

            console.log(response.data);
            if (response.data.message === 'Login successful') {
                setUser(response.data.user);
                console.log('Login successful');
                props.onLogin();
            } else if (response.data.error === 'Password does not match') {
                setError('Password does not match');
            } else if (response.data.error === 'Username does not exist') {
                setError('Username does not exist');
            } else {
                setError('An error occurred');
            }
        } catch (error) {
            console.error('Error sending login request:', error);
            setError('An error occurred');
        }
    };


    const labelStyle = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: 'rgb(66, 66, 66)',
        marginBottom: '5px',
    };

    const formGroupStyle = {
        marginBottom: '10px',
    };

    const formBtnStyle = {
        marginTop: '10px',
    };

    const errorStyle = {
        color: 'red',
    };

    return (
        <div className="App">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">
                        Enter Username:
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Enter Password:
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" name="login" className="button" />
                </div>
            </form>
            {error && <div className="error">{error}</div>}
            <button className="button" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
        </div>
    );
};

export default Login;