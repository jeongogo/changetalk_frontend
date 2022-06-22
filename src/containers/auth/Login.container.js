import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import useStore from "../../modules/store";
import Login from '../../components/auth/Login';

const LoginContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async (values) => {
    const { password, email } = values;
    const { data } = await axios.post('/api/auth/login', {
      email,
      password,
    });
    if (data.status === false) {
      setError(data.msg);
    }
    if (data.status === true) {
      let user = data.user;
      const decoded = jwt_decode(data.token);
      user.accessToken = data.token;
      user.exp = decoded.exp;
      setUser(user);
      navigate('/');
    }
  }

  return (
    <Login handleLogin={handleLogin} error={error} />
  );
}

export default LoginContainer;