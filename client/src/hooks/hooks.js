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
