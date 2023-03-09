/* eslint-disable react/prop-types */
import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

export const ConfirmPasswordForm = (props) => {
  const changeHandler = (event) => {
    const { name, value } = event.target;
    props.setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form>
      <FloatingLabel
        controlId="floatingInput"
        label="Old password"
        className="mb-4"
      >
        <Form.Control onChange={changeHandler} name='password' type="password" placeholder="*******" />
      </FloatingLabel>
      <FloatingLabel className='mb-1' controlId="floatingNew" label="New password ">
        <Form.Control minLength={8} onChange={changeHandler} name='newPassword' type="password" placeholder="********" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingConfirm" label="Confirm password ">
        <Form.Control onChange={changeHandler} name='confirmPassword' type="password" placeholder="********" />
      </FloatingLabel>
    </Form>
  );
};
