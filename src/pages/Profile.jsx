/* eslint-disable react/self-closing-comp */
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="place-items-center">
            <div className="avatar self-center">
              <div className="max-w-md">
                <div className="flex justify-center items-center">
                  {userProfile?.picture && <img className="mask mask-circle" style={{ width: '250px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
                </div>
                <h2 className="py-6">
                  Hello guys, my name is
                  {' '}
                  {userProfile?.fullName ?? '(Belum di set)'}
                  . And my birthdate is
                  {' '}
                  {userProfile?.birthDate ?? '(Belum di set)'}
                </h2>
                <button type="button" className="btn btn-primary mx-1 btn-outline">
                  <Link to="/">Back</Link>
                </button>
                <button type="button" className="btn btn-primary mx-1">
                  <Link to="/profile/edit">Edit Profile</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
