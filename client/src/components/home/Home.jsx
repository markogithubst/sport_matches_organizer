import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [reservationsResponse, fieldsResponse] = await Promise.all([
        axios.get('http://localhost:8000/reservation'),
        axios.get('http://localhost:8000/field')
      ]);

      const reservations = reservationsResponse.data.data
        .filter(reservation => !reservation.isFinished && !reservation.isCanceled)
        .map(reservation => {
          const field = fieldsResponse.data.data.find(field => field._id === reservation.field);
          return {
            ...reservation,
            field: field.name,
            maxPlayers: field.maxPlayers
          };
        });

      setReservations(reservations);
    };
    fetchData();
  }, []);

  return (
    <Container className="container">
      <h1 className="my-3">All Reservations</h1>
      <Card className="shadow">
        <Card.Body>
          <div>
            <ul className="list-group">
              {reservations.map(reservation => (
                <li key={reservation._id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-1">Field: {reservation.field}</p>
                      <p className="mb-1">Number of registered players: {reservation.registeredPlayers.length}</p>
                      <p className="mb-1">Time: {new Date(reservation.time).toLocaleString()}</p>
                      <p className="mb-1">Max players for this field: {reservation.maxPlayers}</p>
                    </div>
                    {isLoggedIn() && (
                      <div className="d-grid">
                        <div className="d-grid">
                          <Link to={`/reservation/${reservation._id}`} className="mt-5 mb-5 h-25 btn btn-primary">
                            View details
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
