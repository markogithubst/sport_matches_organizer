import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ResetPasswordForm } from './ResetPassForm';
import axios from 'axios';
import { useToastify } from '../../hooks/useToastify';

export const ResetPassword = () => {
  const [formData, setFormData] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const emailToken = pathname.split('/')[3];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.confirmPassword !== formData.password) {
        setData({ error: 'Passwords need to match!' });
        return;
      }
      const request = { password: formData.password };
      await axios.patch(`http://localhost:8000/reset-password/${id}/${emailToken}`, request);

      navigate('/login');
    } catch (err) {
      useToastify(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <ResetPasswordForm formData={formData} data={data} handleSubmit={handleSubmit} handleChange={handleChange } />
  );
};
