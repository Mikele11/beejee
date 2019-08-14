import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Register = props => {
  const [state, setValues] = useState({
    username: '',
    password: ''
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

    axios.post('/api/auth/register', { username, password })
      .then(() => {
        props.history.push('/login');
      });
  };

  return (
    <div class="container">
      <form class="form-signin" onSubmit={submit}>
        <h2 class="form-signin-heading">Register</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" class="form-control" placeholder="Email address" name="username" value={state.username} onChange={updateField} required/>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value={state.password} onChange={updateField} required/>
        <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={submit}>Register</button>
      </form>
    </div>
  );
};

export default Register;