import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>,
  },
  {
    path: '/edit-profile',
    element: <RequireAuth><EditProfile /></RequireAuth>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
