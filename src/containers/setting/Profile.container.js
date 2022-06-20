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

  const handleProfileSave = async (user) => {
    try {
      if (user.avatarImage[0]) {
        const formData = new FormData();
        formData.append("image", user.avatarImage[0]);
  
        const res = await axios.post('/api/auth/profile/upload', formData);
        user.avatarImage = res.data.image;
      }
      const { data } = await axios.post(`/api/auth/${currentUser._id}`, user);
      setUser(data);
    } catch (err) {
      console.log(err);
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