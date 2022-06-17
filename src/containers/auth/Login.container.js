import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from "../../modules/store";
import Login from '../../components/auth/Login';

const LoginContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async (values) => {
    const { password, userid } = values;
    const { data } = await axios.post('/api/auth/login', {
      userid,
      password,
    });
    if (data.status === false) {
      setError(data.msg);
    }
    if (data.status === true) {
      setUser(data.user);
      navigate('/');
    }
  }

  return (
    <Login handleLogin={handleLogin} error={error} />
  );
}

export default LoginContainer;