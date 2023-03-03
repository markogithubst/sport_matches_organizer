import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export const RegForm = (props) => {
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
                    <Form onSubmit={props.handleSubmit}>
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
                          value={props.formData.username}
                          onChange={props.handleChange}
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
                          value={props.formData.name}
                          onChange={props.handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicLastName"
                      >
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          name="surname"
                          value={props.formData.surname}
                          onChange={props.handleChange}
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
                          value={props.formData.email}
                          onChange={props.handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={props.formData.password}
                          onChange={props.handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter phone number"
                          name="phone"
                          value={props.formData.phone}
                          onChange={props.handleChange}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
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
    )
}