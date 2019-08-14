import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = props => {

  const [state, setValues] = useState({
    username: '',
    password: '',
    message: ''
  });

  const updateField = e => {
    setValues({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const { username, password } = state;

    axios.post('/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('login', username);
        localStorage.setItem('password', password);
        setValues({ message: '' });
        props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          setValues({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  return (
    <div class="container">
      <form class="form-signin" onSubmit={submit}>
        {state.message !== '' &&
          <div class="alert alert-warning alert-dismissible" role="alert">
            { state.message }
          </div>
        }
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" class="form-control" placeholder="Email address" name="username" value={state.username} onChange={updateField} required/>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value={state.password} onChange={updateField} required/>
        <Link to="/register" className="btn btn-link">Register</Link>
        <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={submit}>Login</button>
      </form>
    </div>
  );
}

export default Login;