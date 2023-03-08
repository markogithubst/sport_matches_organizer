import axios from 'axios';

const URL = 'http://localhost:8000/';

export const httpGetUser = async (userId) => {
  return await axios.get(`${URL}user/${userId}`);
};
export const httpUpdateUser = async (userId, editedUser) => {
  delete editedUser._id;

  return await axios.put(`${URL}user/${userId}`,
    editedUser, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
};

export const httpGetUserHistory = async (id) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${URL}user/${id}/history`, {
    headers: {
      Authorization: token
    }
  });
};

export const httpGetMatch = async (id) => {
  return await axios.get(`${URL}match/${id}`);
};
