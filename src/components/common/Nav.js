import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FiUser, FiMessageCircle, FiSearch, FiSettings } from "react-icons/fi";

const Nav = () => {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/friends">
            <FiUser />
          </Link>
        </li>
        <li>
          <Link to="/">
            <FiMessageCircle />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <FiSearch />
          </Link>
        </li>
        <li>
          <Link to="/setting">
            <FiSettings />
          </Link>
        </li>
      </ul>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fafafa;
  border-top: 1px solid #eee;
  z-index: 9;
  ul {
    display: flex;
    li {
      flex-grow: 1;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3.2rem;
        font-size: 1.4rem;
        color: #000;
      }
    }
  }
`;

export default Nav;