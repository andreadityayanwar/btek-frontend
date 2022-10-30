/* eslint-disable no-alert */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';

YupPassword(Yup);

function Login() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      const { data } = await http().post('/auth/login', form.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={basicAuthSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form>
            <Field type="email" name="email" />
            <br />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            <br />
            <Field type="password" name="password" />
            <br />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
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
