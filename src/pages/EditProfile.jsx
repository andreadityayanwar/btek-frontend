import React from 'react';
import http from '../helpers/http';

function EditProfile() {
  const [userProfile, setUserProfile] = React.useState({});
  const getProfile = async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await http(token).get('/profile');
    setUserProfile(data.results);
  };
  const saveData = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    const form = new FormData();
    form.append('fullName', e.target.fullName.value);
    form.append('birthDate', e.target.birthDate.value);
    form.append('picture', e.target.picture.files[0]);
    const { data } = await http(token).put('/profile', form, {
      headers: {
        'Content-Type': 'multypart/form-data',
      },
    });
    setUserProfile(data.results);
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {userProfile?.picture && <img style={{ width: '240px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
      <form onSubmit={saveData}>
        Full Name :
        <br />
        <input type="text" name="fullName" defaultValue={userProfile?.fullName} />
        <br />
        Picture :
        <br />
        <input type="file" name="picture" defaultValue={userProfile?.picture} />
        <br />
        Birth Date :
        <br />
        <input type="text" name="birthDate" defaultValue={userProfile?.birthDate} />
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditProfile;
