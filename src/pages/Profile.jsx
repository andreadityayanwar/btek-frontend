import React from 'react';
import { Link } from 'react-router-dom';
import http from '../helpers/http';

function Profile() {
  const [userProfile, setUserProfile] = React.useState({});
  const getProfile = async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await http(token).get('/profile');
    setUserProfile(data.results);
  };

  React.useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      {userProfile?.picture && <img style={{ width: '300px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
      <div>
        Full Name :
        {' '}
        {userProfile?.fullName}
      </div>
      <div>
        Birth Date :
        {' '}
        {userProfile?.birthDate}
      </div>
      <div>
        Picture :
        {' '}
        {userProfile?.picture}
      </div>
      <div>
        <Link to="/profile/edit">Edit Profile</Link>
      </div>
    </div>
  );
}

export default Profile;
