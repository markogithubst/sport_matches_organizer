
import React, { useState, useEffect } from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';
import { httpGetUser, httpUpdateUser } from '../../hooks/hooks';
import { UserInfo } from './UserInfo';

export const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  const editUser = async (editedUser) => {
    const { data } = await httpUpdateUser(localStorage.getItem('userid'), editedUser);
    setUser({ ...data.data });
  };

  useEffect(() => {
    const asyncCall = async () => {
      const { data } = await httpGetUser(localStorage.getItem('userid'));
      setUser(data.data);
      setIsLoading(false);
    };
    try {
      asyncCall();
    } catch (err) {
      console.error(err);
    }

    return () => {
      // cleanup
    };
  }, []);

  return <Container className='align-items-center justify-content-center'>
    {!isLoading && <UserInfo user={user} editUser={editUser} />}
    <Row className='vh-100 justify-content-center align-content-center'>
      {isLoading && <Spinner animation='border' variant='primary' />}

    </Row>

  </Container>;
};
