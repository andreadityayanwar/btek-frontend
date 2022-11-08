import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body px">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className=" py-3 text-5xl font-bold"> HOME PAGE</h1>
              <button className="btn btn-primary mx-1" type="button" onClick={() => { navigate('/profile'); }}>Profile</button>
              <button className="btn btn-primary mx-1" type="button" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
