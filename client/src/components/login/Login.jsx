/* eslint-disable react/no-unescaped-entities */
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToastifyError } from '../../hooks/useToastify';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { email: formData.email, password: formData.password };
      const response = await axios.post('http://localhost:8000/login',
        request
      );

      localStorage.setItem('token', response.headers.authorization);
      localStorage.setItem('role', response.headers.role);
      localStorage.setItem('userid', response.headers.userid);

      navigate('/');
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
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary">
            </div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-5 mt-md-4">
                  <h2 className="fw-bold mb-5 text-center">Welcome</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="/forgotten-password">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
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
};
