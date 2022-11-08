/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';

YupPassword(Yup);

function Register() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/register', form.toString());
      navigate('/login');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="grid grid-cols-6 gap-4">
        <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
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
                      <label htmlFor="email">Email</label>
                      <Field className="input input-bordered w-full max-w-xs" type="text" name="email" placeholder="Email" />
                      <br />
                      {errors.email && touched.email ? (
                        <div className=" text-red-500">{errors.email}</div>
                      ) : null}
                      <br />
                      <label htmlFor="email">Password</label>
                      <Field className="input input-bordered w-full max-w-xs" type="password" name="password" placeholder="Enter Your Password" />
                      <br />
                      {errors.password && touched.password ? (
                        <div className=" text-red-500">{errors.password}</div>
                      ) : null}
                      <br />
                      <button className="btn btn-primary block w-full" type="submit">Register</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
