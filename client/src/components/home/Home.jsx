import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import { isLoggedIn } from '../../utils/isLoggedIn';

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
                      <p className="mb-1">Number of registered players: {reservation.num}</p>
                      <p className="mb-1">Time: {new Date(reservation.time).toLocaleString()}</p>
                      <p className="mb-1">Max players for this field: {reservation.maxPlayers}</p>
                    </div>
                    {isLoggedIn() && (
                      <div className="d-grid">
                        <Button className="mt-5 mb-5 h-25" variant="primary" type="button">
                          View details
                        </Button>
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
