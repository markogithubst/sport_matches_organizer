import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Registration = () =>{

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    role: "USER"
  });

  const handleSubmit = async (event)=>{
    event.preventDefault();
  try{
    const request = {...formData}
    await axios.post('http://localhost:8000/user',request);
    navigate("/login")
  }
  catch(err)
  {
    if(err.response)
    {
      setErrorMessage(err.response.data.message)
    }
    else{
      console.log(err)
      setErrorMessage("Oops something went wrong...")
    }
  }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
    return(
      <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary">
            </div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-5 mt-md-4">
                <h2 className="fw-bold mb-5 text-center">Register</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label className="text-center">
                          First Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" name="name" value={formData.name} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" name="surname" value={formData.surname} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPhone"
                      >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter phone number" name="phone" value={formData.phone} onChange={handleChange}/>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    )
  }
  
  export default Registration