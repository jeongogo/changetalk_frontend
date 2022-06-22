import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import useStore from "../../modules/store";
import Register from '../../components/auth/Register';

const RegisterContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const setUser = useStore((state) => state.setUser);

  const handleRegister = async (values) => {
    const { email, username, password } = values;
    const { data } = await axios.post('/api/auth/register', {
      email,
      username,
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
  };

  return (
    <Register handleRegister={handleRegister} error={error} />
  );
}

export default RegisterContainer;