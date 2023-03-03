/* eslint-disable react/no-unescaped-entities */
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword () {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { password: formData.password };
      await axios.post('http://localhost:8000/reset-password',
        request
      );

      navigate('/login');
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        console.log(err);
        setErrorMessage('Oops something went wrong...');
      }
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
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary">
            </div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-5 mt-md-4">
                  <h2 className="fw-bold mb-5 text-center">Reset Password</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirm-password" onChange={handleChange} placeholder="Re-enter Password" />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
