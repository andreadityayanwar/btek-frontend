import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../helpers/http';

function Login() {
  const navigate = useNavigate();
  const submitAction = async (e) => {
    try {
      e.preventDefault();
      const form = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const encoded = new URLSearchParams(form);
      const { data } = await http().post('/auth/login', encoded.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={submitAction}>
        <input type="email" name="email" />
        <br />
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      <div>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
}

export default Login;
