import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../../modules/store';
import Header from '../../components/common/Header';
import Profile from '../../components/setting/Profile';

const ProfileContainer = () => {
  const currentUser = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [successMessage, setSuccessMessage] = useState();
  const [openAlarm, setOpenAlarm] = useState(false);

  const handleProfileSave = async (user) => {
    try {
      if (user.avatarImage[0]) {
        const formData = new FormData();
        formData.append("image", user.avatarImage[0]);
  
        const res = await axios.post(
          '/api/auth/profile/upload',
          formData,
          {
            headers: { authorization: 'Bearer ' + currentUser.accessToken }
          }
        );
        user.avatarImage = res.data.image;
      } else {
        delete user.avatarImage;
      }
      const { data } = await axios.post(
        `/api/auth/${currentUser._id}`,
        user,
        {
          headers: { authorization: 'Bearer ' + currentUser.accessToken }
        }
      );
      setOpenAlarm(true);
      setSuccessMessage('저장 완료되었습니다.');
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header title='프로필 설정' goBack />
      <Profile
        currentUser={currentUser}
        handleProfileSave={handleProfileSave}
        successMessage={successMessage}
        openAlarm={openAlarm}
        setOpenAlarm={setOpenAlarm}
      />
    </>
  );
}

export default ProfileContainer;