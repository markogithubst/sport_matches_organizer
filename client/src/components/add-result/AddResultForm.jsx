import React from 'react';
import { Col, Button, Row, Container, Card, Form, InputGroup } from 'react-bootstrap';

export const AddResultForm = (PropTypes) => {
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
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Enter Scores</InputGroup.Text>
                      <Form.Control
                        aria-label="blackTeamScore"
                        type="text"
                        placeholder="Black Team Score"
                        name="blackTeamScore"
                        value={PropTypes.formData.blackTeamScore}
                        onChange={PropTypes.handleChange}
                      />
                      <Form.Control
                        aria-label="whiteTeamScore"
                        type="text"
                        placeholder="White Team Score"
                        name="whiteTeamScore"
                        value={PropTypes.formData.whiteTeamScore}
                        onChange={PropTypes.handleChange}
                      />
                    </InputGroup>

                    <div className="d-grid mt-4">
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
