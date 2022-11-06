import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';

YupPassword(Yup);

function EditProfile() {
  const navigate = useNavigate();

  const editProfileSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    birthDate: Yup.string().required(),
    picture: Yup.mixed().nullable(),
  });

  const [userProfile, setUserProfile] = React.useState({});
  const getProfile = async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await http(token).get('/profile');
    setUserProfile(data.results);
  };

  const [file, setFile] = React.useState(null);
  const submitAction = async (values) => {
    const token = window.localStorage.getItem('token');
    const form = new FormData();
    form.append('fullName', values.fullName);
    form.append('birthDate', values.birthDate);
    form.append('picture', file);
    const { data } = await http(token).put('/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setUserProfile(data.results);
    navigate('/profile');
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {userProfile?.picture && <img style={{ width: '240px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
      <Formik
        initialValues={{
          fullName: '',
          picture: '',
          birthDate: '',
        }}
        validationSchema={editProfileSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form>
            <Field type="text" name="fullName" />
            <br />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} name="picture" />
            <br />
            {errors.picture && touched.picture ? (
              <div>{errors.picture}</div>
            ) : null}
            <br />
            <Field type="date" name="birthDate" />
            <br />
            {errors.birthDate && touched.birthDate ? (
              <div>{errors.birthDate}</div>
            ) : null}
            <br />
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditProfile;
