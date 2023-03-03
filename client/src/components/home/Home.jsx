import React from 'react';

export const Home = () => {
  const token = localStorage.getItem('token');

  return <h1>{token ? 'Logged in' : 'Not logged in'}</h1>;
};
