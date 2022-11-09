/* eslint-disable no-alert */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function ResetPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.resetPassword(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/login');
    }
  }, [store]);

  return (
    <Formik
      initialValues={{
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <Form>
          <Field type="text" name="code" />
          <br />
          {errors.code && touched.code ? (
            <div>{errors.code}</div>
          ) : null}
          <br />
          <Field type="text" name="email" />
          <br />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br />
          <Field type="password" name="newPassword" />
          <br />
          {errors.newPassword && touched.newPassword ? (
            <div>{errors.newPassword}</div>
          ) : null}
          <br />
          <Field type="password" name="confirmPassword" />
          <br />
          {errors.confirmPassword && touched.confirmPassword ? (
            <div>{errors.confirmPassword}</div>
          ) : null}
          <br />
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword;
