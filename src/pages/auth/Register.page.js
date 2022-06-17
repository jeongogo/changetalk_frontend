import React from 'react';
import Nav from '../../components/common/Nav';
import RegisterContainer from '../../containers/auth/Register.container';

const RegisterPage = () => {
  return (
    <>
      <Nav />
      <RegisterContainer />
    </>
  );
}

export default RegisterPage;