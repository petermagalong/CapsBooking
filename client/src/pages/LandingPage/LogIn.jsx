import { Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function LogIn() {
  const initialValue = { email: "", password: "" }
  const [formValues, setFormvalues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setSubmit] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ [name]: value }, "gggggg", value)
    setFormvalues({ ...formValues, [name]: value })

  }
  const handlesSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues));
    setSubmit(true)
  }
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
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
                  <Form.Control style={{ height: '50px' }} type="text" placeholder="Enter email" name='email' value={formValues.email || ""} onChange={handleChange} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <p>{formErrors.email}</p>
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
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default LogIn;