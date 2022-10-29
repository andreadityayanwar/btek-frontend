import React from 'react';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

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
    path: '/profile/edit',
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
