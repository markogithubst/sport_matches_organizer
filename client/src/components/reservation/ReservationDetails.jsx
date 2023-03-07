import { useEffect, React, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { isLoggedIn } from '../../utils/isLoggedIn';

export const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [field, setField] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reservationResponse = await axios.get(`http://localhost:8000/reservation/${id}`);
      setReservation(reservationResponse.data.data);

      const fieldResponse = await axios.get(`http://localhost:8000/field/${reservationResponse.data.data.field}`);
      setField(fieldResponse.data.data);

      const userResponse = await axios.get('http://localhost:8000/user');
      setUsers(userResponse.data.data);
    };
    fetchData();
  }, [id]);

  const getRegisteredPlayersUsernames = () => {
    return reservation.registeredPlayers?.map(playerId => {
      const player = users.find(user => user._id === playerId);
      return player ? player.username : 'Unknown';
    });
  };

  return (
    <Container className="container">
      <h1 className="my-3">Reservation Details</h1>
      <Card className="shadow">
        <Card.Body>
          {isLoggedIn() && (
            <div>
              <p className="mb-1">Field Name: {field.name}</p>
              <p className="mb-1">Field Address: {field.address}</p>
              <p className="mb-1">Field City: {field.city}</p>
              <p className="mb-1">Number of registered players: {reservation.registeredPlayers?.length || 0}</p>
              <p className="mb-1">Time: {new Date(reservation.time)?.toLocaleString()}</p>
              <p className="mb-1">Max players for this field: {field.maxPlayers}</p>
              <p className="mb-1">Registered players usernames: {getRegisteredPlayersUsernames()?.join(', ')}</p>
              <Button className='mt-3 mb-3 me-3'>Play in this match</Button>
              <Button className='mt-3 mb-3'>Withdraw</Button>
            </div>
          )}
          {!isLoggedIn() && (
            <div>You need to be logged in to view this page!</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
