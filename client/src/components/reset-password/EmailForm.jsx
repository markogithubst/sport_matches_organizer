import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useToastifyError } from '../../hooks/useToastify';
import axios from 'axios';

export const EmailForm = () => {
  const [formData, setFormData] = useState();
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { email: formData.email };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/forgotten-password`,
        request
      );

      setData(response.data);
      e.target.reset();
    } catch (err) {
      useToastifyError(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setFormData({
      email: value
    });
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
                  <h2 className="fw-bold mb-5 text-center">Forgot your password?</h2>
                  {data && <div className='alert alert-success'>{data.message}</div>}
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-5"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Enter your email and we&apos;ll send you a link to reset your password.</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleChange} placeholder="Account Email" />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Send Reset Link
                        </Button>
                      </div>
                    </Form>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don&apos;t have an account?{' '}
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
