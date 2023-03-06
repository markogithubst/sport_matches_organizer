import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import React from 'react';

export const ResetPasswordForm = (propTypes) => {
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
                    <Form onSubmit={propTypes.handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={propTypes.handleChange} placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formConfirmPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" onChange={propTypes.handleChange} placeholder="Re-enter Password" />
                      </Form.Group>
                      {propTypes.data && <div className='alert alert-danger'>{propTypes.data.error}</div>}
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Reset Password
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
