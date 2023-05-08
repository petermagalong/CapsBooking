import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import UserSidebar from '../../components/UserSidebar';

export default function PatientProfilePage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const age = '25'
  return (
    <UserSidebar>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* FNAME */}
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* MIDDLE NAME */}
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Middle name</Form.Label>
            <Form.Control
              type="text"
              defaultValue="Otto"
            />
          </Form.Group>
          {/* LNAME */}
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* B_DATE */}
          <Form.Group as={Col} md="2" controlId="validationCustom02">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              required
              type="date"
              defaultValue="11/11/2009"
            />
          </Form.Group>
          {/* AGE */}
          <Form.Group as={Col} md="1" controlId="validationCustom02">
            <Form.Label>Age</Form.Label>
            <Form.Control
              disabled
              type="text"
              defaultValue={age}
            />
          </Form.Group>
          {/* CONTACT # */}
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue="09238562378"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* AGENCY */}
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Agency</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue="somewhere"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* ADDRESS */}
          <Form.Group as={Col} md="5" controlId="validationCustom02">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue="NY CITY"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* USERNAME */}
          <Form.Group as={Col} md="6" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                required
                value='akoto@email.com'
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          {/* PASSWORD */}
          <Form.Group as={Col} md="6" controlId="validationCustomUsername">
            <Form.Label>Pasword</Form.Label>
            <Form.Control
              type="password"
              aria-describedby="inputGroupPrepend"
              required
              value='akoto@email.com'
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">

          <h2 style={{ textAlign: 'center' }}>EMERGENCY CONTACT</h2>

          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" red />
            <Form.Control.Feedback type="invalid">
              Please provide Emergency Contact.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="number" ired />
            <Form.Control.Feedback type="invalid">
              Please provide a valid contact number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" ed />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <h2 style={{ textAlign: 'center' }} >ID</h2>
          {/* MIDDLE NAME */}
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Type Of ID</Form.Label>
            <Form.Control
              type="text"
              defaultValue="Otto"
            />
          </Form.Group>
          {/* LNAME */}
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>ID Number</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue="Otto"
            />
          </Form.Group>
          <Form.Group as={Col} md='4' className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
            // onChange={handleChange}
            // isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {/* {errors.file} */}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Edit</Button>
      </Form>
    </UserSidebar>
  )
}