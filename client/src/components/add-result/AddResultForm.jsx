import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export const ResultForm = (PropTypes) => {
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-5 mt-md-4">
                <h2 className="fw-bold mb-5 text-center">Add Match Results</h2>
                <div className="mb-3">
                  <Form onSubmit={PropTypes.handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBlackScore"
                    >
                      <Form.Label className="text-center">
                          Black Team Score
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={PropTypes.formData.blackTeamScore}
                        onChange={PropTypes.handleChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicFirstName"
                    >
                      <Form.Label className="text-center">
                          First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="name"
                        value={PropTypes.formData.name}
                        onChange={PropTypes.handleChange}
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                          Submit Result
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
