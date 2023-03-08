import React from 'react';
import { Col, Button, Row, Container, Card, Form, InputGroup } from 'react-bootstrap';

export const RegForm = (PropTypes) => {
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-5 mt-md-4">
                <h2 className="fw-bold mb-5 text-center">Register</h2>
                <div className="mb-3">
                  <Form onSubmit={PropTypes.handleSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>First and last name</InputGroup.Text>
                      <Form.Control
                        aria-label="name"
                        type="text"
                        placeholder="Enter first name"
                        name="name"
                        value={PropTypes.formData.name}
                        onChange={PropTypes.handleChange}
                      />
                      <Form.Control
                        aria-label="surname"
                        type="text"
                        placeholder="Enter last name"
                        name="surname"
                        value={PropTypes.formData.name}
                        onChange={PropTypes.handleChange}
                      />
                    </InputGroup>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicUsername"
                    >
                      <Form.Label className="text-center">
                          Username
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={PropTypes.formData.username}
                        onChange={PropTypes.handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                          Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={PropTypes.formData.email}
                        onChange={PropTypes.handleChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={PropTypes.formData.password}
                        onChange={PropTypes.handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        name="phone"
                        value={PropTypes.formData.phone}
                        onChange={PropTypes.handleChange}
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                          Register
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                        Already have an account?{' '}
                      <a href="/login" className="text-primary fw-bold">
                          Log in
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
  );
};
