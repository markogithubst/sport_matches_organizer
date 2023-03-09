import axios from 'axios';

export const httpGetUser = async (userId) => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${userId}`);
};
export const httpUpdateUser = async (userId, editedUser) => {
  delete editedUser._id;

  return await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/${userId}`,
    editedUser, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
};

export const httpGetUserHistory = async (id) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}/history`, {
    headers: {
      Authorization: token
    }
  });
};

export const httpGetMatch = async (id) => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/match/${id}`);
};

export const httpGetReservation = async (id) => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/reservation/${id}`);
};

export const httpPasswordChange = async (data, user) => {
  return await axios.patch(`${URL}${user.id}/reset-password`, data, {
    headers: {
      Authorization: user.token
    }
  });
};
