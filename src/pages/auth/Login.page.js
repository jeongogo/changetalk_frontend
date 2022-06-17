import React from 'react';
import Nav from '../../components/common/Nav';
import LoginContainer from '../../containers/auth/Login.container.js';

const LoginPage = () => {
  return (
    <>
      <Nav />
      <LoginContainer />
    </>
  )
}

export default LoginPage