import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function EmailForm() {
    const[formData, setFormData] = useState({})
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
      try{
        const request = {emai: formData.password}
        await axios.post('http://localhost:8000/reset-password',
          request
        )
        
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

      const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
    
        setFormData((prevState) => ({
          ...prevState,
          [name]:value
        }))
      }

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
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-5"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Enter your email and we'll send you a link to reset your password.</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleChange} placeholder="Account Email" />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Send Reset Link
                        </Button>
                      </div>
                    </Form>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
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