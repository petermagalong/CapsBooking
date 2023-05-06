import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import "./styles.css";
import { Link, Route, Routes } from "react-router-dom";

export default function SignUp() {
  const initialValue = {
    fname: "",
    lname: "",
    midName: "",
    number: "",
    role: "",
    birthdate: "",
    sex: "",
    address: "",
    agency: "",
    typeid: "",
    idnum: "",
    email: "",
    firstpass: "",
    secondpass: "",
    ename: "",
    econtact: "",
    eaddress: "",
  }
  const [formValues, setFormvalues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setSubmit] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    if (!values.fname) {
      errors.fname = '*First name is required'
    }
    if (!values.lname) {
      errors.lname = '*Last name is required'
    }
    if (!values.number) {
      errors.number = '*Number is required'
    }
    if (!values.role) {
      errors.role = '*Role is required'
    }
    if (!values.birthdate) {
      errors.birthdate = '*Birthdate is required'
    }
    if (!values.sex) {
      errors.sex = '*Sex is required'
    }
    if (!values.address) {
      errors.address = '*Address is required'
    }
    if (!values.agency) {
      errors.agency = 'Agency is required'
    }
    if (!values.typeid) {
      errors.typeid = '*ID is required'
    }
    if (!values.idnum) {
      errors.idnum = '*ID number is required'
    }
    if (!values.email) {
      errors.email = "*Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "*This is not a valid email format!";
    }
    if (!values.firstpass) {
      errors.firstpass = "*Password is required";
    }
    if (!values.secondpass) {
      errors.secondpass = '*Confirm Password!';
    }
    else if (values.firstpass !== values.secondpass) {
      errors.secondpass = '*Password Dont Match'
    }
    return errors;
  };
  return (
    <>
      <Card style={{ background: 'linear-gradient(90deg, rgba(69,11,7,1) 0%, rgba(7,25,71,1) 100%)', height: '88vh', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Card style={{ width: '50vw', marginTop: '50px', maxHeight: '70vh', overflowY: 'scroll', borderRadius: '50px', background: 'linear-gradient(90deg, rgba(149,28,20,1) 0%, rgba(4,6,29,0.1881127450980392) 0%)', border: '1px solid #7e7053', boxShadow: '1px 1px 5px #e6c78a' }}>

          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="ui message success">Signed in successfully</div>
          ) : ''}
          <Form
            onSubmit={handlesSubmit}
            style={{ padding: ' 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* FIRST FORM (NAME ) */}
            <h1 style={{ color: '#e6c78a', marginBottom: '30px' }}>Please Fill up the following Informations</h1>
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>First Name:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='fname' value={formValues.fname} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.fname}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Last Name:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='lname' value={formValues.lname} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.lname}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Middle Name:</h5>
                <Form.Control style={{ height: '50px' }} type="text" placeholder="(Optional)" name='midName' value={formValues.midName} onChange={handleChange} />
              </Col>
            </Row>

            {/* SECOND FORM (CONTATC NUMBER / ROLE/ BIRTHDATE ) */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>Contact Number:</h5>
                <Form.Control style={{ height: '50px' }} type="number" name='number' value={formValues.number} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.number}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}> Role:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='role' value={formValues.role} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.role}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Birth Date:</h5>
                <Form.Control style={{ height: '50px' }} type="date" name='birthdate' value={formValues.birthdate} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.birthdate}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Sex:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='sex' value={formValues.sex} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.sex}</p>
              </Col>
            </Row>

            {/* 3rd FORM (ADDRESS) */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>Address:</h5>
                <Form.Control style={{ height: '50px' }} type="address" name='address' value={formValues.address} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.address}</p></Col>
            </Row>

            {/* 4th FORM (AGENCY) */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>Agency:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='agency' value={formValues.agency} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.agency}</p></Col>
              <Col>
                <h5 style={{ color: 'white' }}>Type of ID:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='typeid' value={formValues.typeid} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.typeid}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>ID Number:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='idnum' value={formValues.idnum} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.idnum}</p>
              </Col>
            </Row>

            {/* 5th FORM EMAIL */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>E-Mail:</h5>
                <Form.Control style={{ height: '50px' }} type="email" name='email' value={formValues.email} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.email}</p>
              </Col>
            </Row>

            {/* 6th Form (Passwords) */}
            <Row style={{ width: '100%' }} fluid >
              <Col>
                <h5 style={{ color: 'white' }}>Enter Password:</h5>
                <Form.Control style={{ height: '50px' }} type="password" name='firstpass' value={formValues.firstpass} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.firstpass}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Confirm Password:</h5>
                <Form.Control style={{ height: '50px' }} type="password" name='secondpass' value={formValues.secondpass} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.secondpass}</p>
              </Col>
            </Row>

            {/* 7th FORM EMERGENCY CONTACT NAME */}
            <h3 style={{ color: '#e6c78a', marginBottom: '30px' }} >EMERGENCY CONTACT</h3>
            <Row style={{ width: '100%' }} fluid >
              <Col>
                <h5 style={{ color: 'white' }}>Emergency Contact Name:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='ename' value={formValues.ename} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.ename}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Emergency Contact's Number:</h5>
                <Form.Control style={{ height: '50px' }} type="number" name='econtact' value={formValues.econtact} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.econtact}</p>
              </Col>
            </Row>
            {/* 8th Row Emergency conatct address */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>Emergency Contact Address:</h5>
                <Form.Control style={{ height: '50px' }} type="address" name='eaddress' value={formValues.eaddress} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.eaddress}</p>
              </Col>
            </Row>
            {/* 9th FORM  (TERMS CONDITION)  */}
            <Form.Check style={{ color: '#e6c78a', marginBottom: '30px' }} type="checkbox" label="TERMS AND CONDITION" />

            <Row style={{ width: '100%', justifyContent: 'center' }} fluid>
              <Button
                // as={Link} to={"/LogIn"}
                className="LogPageButton" type="submit" size="lg">
                Submit
              </Button>
            </Row>

          </Form>

        </Card >
      </Card >
      <Routes>
        <Route path="/LogIn" element={<SignUp />} />
      </Routes >
    </>
  )
}
