/* eslint-disable jsx-a11y/label-has-associated-control */
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
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-xl font-bold text-center">EDIT PROFILE</h1>
              <div className="form-control">
                <div className="flex justify-center items-center">
                  {userProfile?.picture && <img className="mask mask-circle" style={{ width: '300px', height: '100%' }} src={`${userProfile?.picture}`} alt={userProfile?.picture} />}
                </div>
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
                      <label htmlFor="email">Full Name</label>
                      <Field className="input input-bordered w-full max-w-xs mb-2" type="text" name="fullName" />
                      <br />
                      {errors.fullName && touched.fullName ? (
                        <div>{errors.fullName}</div>
                      ) : null}
                      <label htmlFor="picture">Picture</label>
                      <input className="file-input file-input-bordered w-full max-w-xs mb-2" type="file" onChange={(e) => setFile(e.target.files[0])} name="picture" />
                      <br />
                      {errors.picture && touched.picture ? (
                        <div>{errors.picture}</div>
                      ) : null}
                      <label htmlFor="birthDate">Birth Date</label>
                      <Field className="input input-bordered w-full max-w-xs mb-5" type="date" name="birthDate" />
                      <br />
                      {errors.birthDate && touched.birthDate ? (
                        <div>{errors.birthDate}</div>
                      ) : null}
                      <br />
                      <button className="btn btn-primary block w-full" type="submit">Save</button>
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

export default EditProfile;
