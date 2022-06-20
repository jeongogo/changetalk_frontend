import React from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Profile = ({ currentUser, handleProfileSave }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userid: currentUser.userid,
      username: currentUser.username,
      stateMessage: currentUser.stateMessage,
      avatarImage: currentUser.avatarImage,
    }
  });

  const onSubmit = (data) => {
    handleProfileSave(data);
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
            {!watch("avatarImage") || watch("avatarImage").length === 0 ? (
              <div>
                <input type="file" className="w-full" {...register("avatarImage")} />
              </div>
            ) : (
              <div>
                <img src={`/${currentUser.avatarImage}`} alt="" />
                <input type="file" className="w-full" {...register("avatarImage")} />
              </div>
            )}
          </div>
        </div>
        <div className='btn'>
          <button type='submit'>저장</button>
        </div>
      </form>
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
      margin-top: 1rem;
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