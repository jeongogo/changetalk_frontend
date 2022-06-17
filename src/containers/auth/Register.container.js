import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Register from '../../components/auth/Register';

const RegisterContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleRegister = async (values) => {
    const { userid, username, password } = values;
    const { data } = await axios.post('/api/auth/register', {
      userid,
      username,
      password,
    });
    if (data.status === false) {
      setError(data.msg);
    }
    if (data.status === true) {
      navigate('/login');
    }
  };

  return (
    <Register handleRegister={handleRegister} error={error} />
  );
}

export default RegisterContainer;