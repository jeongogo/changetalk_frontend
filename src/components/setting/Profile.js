import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Alarm from '../../components/common/Alarm';
import styled from 'styled-components';

const Profile = ({ currentUser, handleProfileSave, successMessage, openAlarm, setOpenAlarm }) => {
  const [error, setError] = useState();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userid: currentUser.userid,
      username: currentUser.username,
      stateMessage: currentUser.stateMessage,
    }
  });

  const handleFileCheck = (file) => {
    if (file.size > 5000000) {
      setError('5MB 이하의 사진을 첨부해 주세요.');
      return false;
    }
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setError('사진 파일만 첨부 가능합니다.');
      return false;
    }
    setError('');
    return true;
  }

  const onSubmit = (data) => {
    handleProfileSave(data);
    setValue(
      "avatarImage",
      ''
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="input-box">
          <div className='wrap'>
            <label>아이디</label>
            <input
              type="text"
              {...register("userid")}
              disabled
            />
          </div>
          <div className='wrap'>
            <label>이름</label>
            <input
              type="text"
              {...register("username")}
              disabled
            />
          </div>
          <div className='wrap'>
            <label>상태메세지</label>
            <input
              type="text"
              {...register("stateMessage")}
            />
          </div>
          <div className="wrap image">
            <label>프로필 이미지</label>
            <div>
              {currentUser.avatarImage && <img src={`/${currentUser.avatarImage}`} alt="" />}
              {!watch("avatarImage") || watch("avatarImage").length === 0 ? (
                <div>
                  <input type="file" className="w-full" {...register("avatarImage", {
                    onChange: (e) => {
                      const check = handleFileCheck(e.target.files[0]);
                      if (!check) {
                        setValue(
                          "avatarImage",
                          ''
                        );
                      }
                    }
                  })} />
                </div>
              ) : (
                <div>
                  <input type="file" className="w-full" {...register("avatarImage")} />
                </div>
              )}
              {error && (
                <div className='error'>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='btn'>
          <button type='submit'>저장</button>
        </div>
      </form>
      {openAlarm && <Alarm text={successMessage} handleClose={setOpenAlarm} />}
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 1rem;
  form {
    .input-box {
      .wrap {
        display: flex;
        align-items: center;
        margin-bottom: 0.7rem;
        &.image {
          div {
            img {
              max-width: 50vw;
            }
          }
          .error{
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: red;
          }
        }
        label {
          width: 7rem;
          flex-shrink: 0;
        }
        input {
          width: 100%;
        }
      }
    }
    .btn {
      margin-top: 1.5rem;
      text-align: right;
      button {
        width: 7rem;
        height: 2.8rem;
        color: white;
        text-transform: uppercase;
        background-color: #9575CD;
      }
    }
  }
`;

export default Profile;