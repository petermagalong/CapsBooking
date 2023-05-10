import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import "./styles.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { registerPatient } from '../../services/accounts';

export default function SignUp() {
  const initialValue = {
    first_name: "",
    last_name: "",
    middle_name: "",
    contact_number: "",
    role: "patient",
    birthday: "",
    sex: "Male",
    address: "",
    agency: "",
    type_of_id: "",
    id_number: "",
    email_address: "",
    password: "",
    secondpass: "",
    ec_name: "",
    ec_contact_details: "",
    eaddress: "",
    terms_and_condition:false,
  }
  const [formValues, setFormvalues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setSubmit] = useState()
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value ,type, checked} = e.target;
    const newValue = type === 'checkbox' ? checked : value;

      setFormvalues({ ...formValues, [name]: newValue })
    
  }

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9\b]+$/; // Allow numbers only
    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handlesSubmit =async (e) => {
    e.preventDefault()
    console.log(formValues,'formValues')

    const {
      first_name,
      last_name,
      middle_name,
      contact_number,
      role,
      birthday,
      sex,
      address,
      email_address,
      password,

      agency,
      type_of_id,
      id_number,
      ec_name,
      ec_contact_details,
      ec_address,
      terms_and_condition,
    } = formValues

    const payload = {
      first_name,
      last_name,
      middle_name,
      contact_number,
      role,
      birthday,
      sex,
      address,
      email_address,
      password,

      agency,
      type_of_id,
      id_number,
      ec_name,
      ec_contact_details,
      ec_address,
      terms_and_condition: terms_and_condition ? 1 : 0,
    }
   
    // setFormErrors(validate(formValues));
    const {data, status} = await registerPatient(payload);

    
    setSubmit(true)

    if(status === 200){
      navigate('Login')
    }
    else {
      setFormErrors({...validate(formValues),message:data.message});
    }
  }
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.first_name) {
      errors.first_name = '*First name is required'
    }
    if (!values.last_name) {
      errors.last_name = '*Last name is required'
    }
    if (!values.contact_number) {
      errors.contact_number = '*Number is required'
    }
    if (!values.role) {
      errors.role = '*Role is required'
    }
    if (!values.birthday) {
      errors.birthday = '*birthday is required'
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
    if (!values.email_address) {
      errors.email_address = "*email is required!";
    } else if (!regex.test(values.email_address)) {
      errors.email_address = "*This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "*Password is required";
    }
    if (!values.secondpass) {
      errors.secondpass = '*Confirm Password!';
    }
    else if (values.password !== values.secondpass) {
      errors.secondpass = '*Password Dont Match'
    }
    if (values.terms_and_condition === false) {
      errors.terms_and_condition = '*Terms and condition Must be accept before Register';
    }
    return errors;
  };

  const maxDate = new Date().toISOString().split("T")[0];
  const minYear = new Date().getFullYear() - 5; // Minimum age of 5 years
  const minDate = new Date(minYear, new Date().getMonth(), new Date().getDate());

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
                <Form.Control style={{ height: '50px' }} type="text" name='first_name' value={formValues.first_name} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.first_name}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Last Name:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='last_name' value={formValues.last_name} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.last_name}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Middle Name:</h5>
                <Form.Control style={{ height: '50px' }} type="text" placeholder="(Optional)" name='middle_name' value={formValues.middle_name} onChange={handleChange} />
              </Col>
            </Row>

            {/* SECOND FORM (CONTATC NUMBER ) */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>ContactNumber:</h5>
                <Form.Control style={{ height: '50px' }} 
                type="tel" maxLength="11" 
                name='contact_number' value={formValues.contact_number} 
                onKeyPress={handleKeyPress}
                onChange={handleChange} 
                placeholder="Enter phone number"
                pattern="[0-9]*"
                />
                <p style={{ color: 'red' }}>{formErrors.number}</p>
              </Col>
              {/* <Col>
                <h5 style={{ color: 'white' }}> Role:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='role' value={formValues.role} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.role}</p>
              </Col> */}
              <Col>
                <h5 style={{ color: 'white' }}>Birth Date:</h5>
                <Form.Control style={{ height: '50px' }} type="date" name='birthday' min={minDate} max={minDate} value={formValues.birthday} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.birthday}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Sex:</h5>
                <Form.Select size="lg" name='sex' onChange={handleChange} value={formValues.sex} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </Form.Select>
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
                <h5 style={{ color: 'white' }}>Agency/Company:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='agency' value={formValues.agency} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.agency}</p></Col>
              <Col>
                <h5 style={{ color: 'white' }}>Type of ID:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='type_of_id' value={formValues.type_of_id} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.type_of_id
                }</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>ID Number:</h5>
                <Form.Control style={{ height: '50px' }} type="text" name='id_number' value={formValues.id_number} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.id_number}</p>
              </Col>
            </Row>

            {/* 5th FORM email_address */}
            <Row style={{ width: '100%' }} fluid>
              <Col>
                <h5 style={{ color: 'white' }}>E-Mail:</h5>
                <Form.Control style={{ height: '50px' }} type="email_address" name='email_address' value={formValues.email_address} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.email_address}</p>
              </Col>
            </Row>

            {/* 6th Form (Passwords) */}
            <Row style={{ width: '100%' }} fluid >
              <Col>
                <h5 style={{ color: 'white' }}>Enter Password:</h5>
                <Form.Control style={{ height: '50px' }} type="password" name='password' value={formValues.password} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.password}</p>
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
                <Form.Control style={{ height: '50px' }} type="text" name='ec_name' value={formValues.ec_name} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.ec_name}</p>
              </Col>
              <Col>
                <h5 style={{ color: 'white' }}>Emergency Contact's Number:</h5>
                <Form.Control style={{ height: '50px' }} type="tel" maxLength="11" onKeyPress={handleKeyPress} name='ec_contact_details' value={formValues.ec_contact_details} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.ec_contact_details}</p>
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
            <Form.Check style={{ color: '#e6c78a', marginBottom: '30px' }} type="checkbox" name='terms_and_condition' checked={formValues.terms_and_condition} onChange={handleChange} label="TERMS AND CONDITION" />
              <p style={{ color: 'red' }}> {formErrors.message}</p>
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
