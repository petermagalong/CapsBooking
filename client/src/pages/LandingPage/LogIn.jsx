import { Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { loginAuth } from "../../services/accounts";

function LogIn() {
  const initialValue = { email_address: "", password: "" }
  const [formValues, setFormvalues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setSubmit] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value })

  }
  const handlesSubmit = async (e) => {
    e.preventDefault()
   const { data , status } = await loginAuth(formValues)
 
   if(status > '300'){
    setFormErrors({errorVal:data.message})
   }
   if(status < '300'){
    setFormErrors({})
    localStorage.setItem("userId",data.status.userId)
    localStorage.setItem("role",data.status.role)
   }

  }
  return (
    <>
      <Card style={{ background: 'linear-gradient(90deg, rgba(69,11,7,1) 0%, rgba(7,25,71,1) 100%)', height: '88vh' }}>
        <Row style={{ width: '100%' }}>
          <Col>1 of 2</Col>
          <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px' }}>
            <Card style={{ width: '700px', marginTop: '100px', height: '70vh' }}>
              {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signed in successfully</div>
              ) : ''}
              <Form onSubmit={handlesSubmit} style={{ padding: ' 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form.Group style={{ width: '100%' }} className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontSize: 'x-large' }}>Email address</Form.Label>
                  <Form.Control style={{ height: '50px' }} type="text" placeholder="Enter email" name='email_address' value={formValues.email_address || ""} onChange={handleChange} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <p>{formErrors.email_address}</p>
                </Form.Group>
                <Form.Group style={{ width: '100%' }} className="mb-3" controlId="formBasicEmail" >
                  <Form.Label style={{ fontSize: 'x-large' }}>Password</Form.Label>
                  <Form.Control style={{ height: '50px' }} type="password" placeholder="Password" name='password' value={formValues.password || ""} onChange={handleChange} />
                  <p>{formErrors.password}</p>
                </Form.Group >
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check style={{}} type="checkbox" label="Remember my credentials" />
                </Form.Group>
                <Button style={{ width: '450px', height: '50px', marginTop: '20px' }} variant="primary" type="submit">
                  Submit
                </Button>
                <p>{formErrors.errorVal}</p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default LogIn;