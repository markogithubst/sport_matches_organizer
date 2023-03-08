import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ResetPasswordForm } from './ResetPassForm';
import axios from 'axios';
import { useToastifyError, useToastifySuccess, useToastifyWarning } from '../../hooks/useToastify';

export const ResetPassword = () => {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const emailToken = pathname.split('/')[3];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.confirmPassword !== formData.password) {
        useToastifyWarning('Passwords need to match!');
        return;
      }
      const request = { password: formData.password };
      await axios.patch(`http://localhost:8000/reset-password/${id}/${emailToken}`, request);
      useToastifySuccess('Password seuccessfully updated!');

      navigate('/login');
    } catch (err) {
      useToastifyError(err);
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
    <ResetPasswordForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange } />
  );
};
