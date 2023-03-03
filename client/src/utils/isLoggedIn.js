export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (role && token) {
    return {
      role,
      token
    };
  }
  return false;
};
