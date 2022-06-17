import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../modules/store';
import Header from '../../components/common/Header';
import Profile from '../../components/setting/Profile';

const ProfileContainer = () => {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleProfileSave = async (values) => {
    const { data } = await axios.post(`/api/auth/${currentUser._id}`, {
      username: values.username,
      stateMessage: values.stateMessage
    });

    if (data) {
      setUser(data);
      navigate('/setting');
    }    
  }

  return (
    <>
      <Header title='프로필 설정' goBack />
      <Profile currentUser={currentUser} handleProfileSave={handleProfileSave} />
    </>
  );
}

export default ProfileContainer;