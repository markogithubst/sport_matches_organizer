import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

export const HistoryItem = (PropTypes) => {
  const { item } = PropTypes;

  return (
    <Container className='mt-3 mb-3 bg-body rounded shadow'>
      <Row><h4 className='text-primary text-center mt-2'>{ item.field.name}</h4></Row>
      <Row className=''>
        <Col xs={ 5 } className='align-item-center justify-content-center'>
          <ListGroup className='' variant="flush">
            {item.match.blackTeam.players.map(player => <ListGroup.Item key={ player._id}>{player.username}</ListGroup.Item>)}
          </ListGroup>
        </Col>
        <Col xs={2} className='md-auto d-flex align-items-center justify-content-center'> <p>{`${item.match.result.blackTeamScore}  -  ${item.match.result.whiteTeamScore}`}</p></Col>
        <Col xs={ 5 } className=' align-items-center justify-content-center'>
          <ListGroup className='' variant="flush">
            <ListGroup className='' variant="flush">
              {item.match.whiteTeam.players.map(player => <ListGroup.Item key={ player._id}>{player.username}</ListGroup.Item>)}
            </ListGroup>
          </ListGroup>
        </Col>
      </Row>
    </Container>);
};
