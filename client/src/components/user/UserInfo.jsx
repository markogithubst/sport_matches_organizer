import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { EditForm } from './UserEditForm';

export const UserInfo = (PropTypes) => {
  return (
    <Row>
      <Container xs={ 5 } className="mt-5 mb-3 border border-2 rounded box-shadow">
        <EditForm user={ PropTypes.user } editUser={PropTypes.editUser} />
      </Container>
    </Row>
  );
};
