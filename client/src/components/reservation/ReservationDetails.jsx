import { useEffect, React, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useToastifyError, useToastifySuccess } from '../../hooks/useToastify';

export const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [field, setField] = useState({});
  const [users, setUsers] = useState([]);
  const [onePlayerAdd, addPlayer] = useState({});
  const [onePlayerRemove, removePlayer] = useState({});
  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationResponse = await axios.get(`${URL}reservation/${id}`);
        setReservation(reservationResponse.data.data);

        const fieldResponse = await axios.get(`${URL}field/${reservationResponse.data.data.field}`);
        setField(fieldResponse.data.data);

        const userResponse = await axios.get(`${URL}user`);
        setUsers(userResponse.data.data);
      } catch (err) {
        useToastifyError(err);
      }
    };
    fetchData();
  }, [id, onePlayerAdd, onePlayerRemove]);

  const handleAddPlayerClick = async () => {
    const modifyData = async () => {
      try {
        const userId = localStorage.getItem('userid');
        const token = localStorage.getItem('token');
        const onePlayerAdd = await axios.put(`${URL}reservation/${id}/add-player/${userId}`, null, {
          headers: {
            Authorization: token
          }
        });
        addPlayer(onePlayerAdd);
        useToastifySuccess();
      } catch (err) {
        useToastifyError(err);
      }
    };
    modifyData();
  };

  const handleRemovePlayerClick = async () => {
    const modifyData = async () => {
      try {
        const userId = localStorage.getItem('userid');
        const token = localStorage.getItem('token');
        const onePlayerRemove = await axios.put(`${URL}reservation/${id}/player-withdraw/${userId}`, null, {
          headers: {
            Authorization: token
          }
        });
        removePlayer(onePlayerRemove);
        useToastifySuccess();
      } catch (err) {
        useToastifyError(err);
      }
    };
    modifyData();
  };
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
              {onePlayerAdd && <Button className='mt-3 mb-3 me-3' onClick={handleAddPlayerClick}>Play in this match</Button>}
              {onePlayerRemove && <Button className='mt-3 mb-3' onClick={handleRemovePlayerClick}>Withdraw</Button>}
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
