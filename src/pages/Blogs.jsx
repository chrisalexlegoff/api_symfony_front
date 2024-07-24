import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // If the token/email does not exist, mark the user as logged out
    if (user && new Date(user.exp * 1000) < Date.now()) {
      localStorage.removeItem('user');
    }
    if (!user || !user.token) {
      setLoggedIn(false);
      navigate('/login');
    }
  }, []);
  return <div>Blogs</div>;
};

export default Blogs;
