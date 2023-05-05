import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';

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
      errors.fname = 'First name is required'
    }
    if (!values.lname) {
      errors.lname = 'Last name is required'
    }
    if (!values.number) {
      errors.number = 'Number is required'
    }
    if (!values.role) {
      errors.role = 'Role is required'
    }
    if (!values.birthdate) {
      errors.birthdate = 'Birthdate is required'
    }
    if (!values.sex) {
      errors.sex = 'Sex is required'
    }
    if (!values.address) {
      errors.address = 'Address is required'
    }
    if (!values.agency) {
      errors.agency = 'Agency is required'
    }
    if (!values.typeid) {
      errors.typeid = 'ID is required'
    }
    if (!values.idnum) {
      errors.idnum = 'idnum is required'
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.firstpass) {
      errors.firstpass = "Password is required";
    } else if (values.firstpass.length < 4) {
      errors.firstpass = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.firstpass = "Password cannot exceed more than 10 characters";
    }
    if (!values.secondpass) {
      errors.secondpass = 'Confirm Password!';
    }
    else if (values.firstpass !== values.secondpass) {
      errors.secondpass = 'Password Dont Match'
    }
    return errors;
  };
  return (
    <>
      <Card style={{ background: 'linear-gradient(90deg, rgba(69,11,7,1) 0%, rgba(7,25,71,1) 100%)', height: '88vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: '900px', marginTop: '50px', height: '70vh' }}>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="ui message success">Signed in successfully</div>
          ) : ''}
          <Form onSubmit={handlesSubmit} style={{ padding: ' 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* FIRST FORM (NAME ) */}
            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="formBasicEmail">
              <Form.Control style={{ height: '50px' }} type="text" placeholder="First Name" name='fname' value={formValues.fname} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Last Name" name='lname' value={formValues.lname} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Middle name (Optional)" name='midName' value={formValues.midName} onChange={handleChange} />
              <p>{formErrors.fname}</p>
              <p>{formErrors.email}</p>
            </Form.Group>

            {/* SECOND FORM (CONTATC NUMBER / ROLE/ BIRTHDATE ) */}
            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="formBasicEmail">
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Contact Number" name='number' value={formValues.number} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Role (i.e Patient)" name='role' value={formValues.role} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Birth date" name='birthdate' value={formValues.birthdate} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Sex" name='sex' value={formValues.sex} onChange={handleChange} />
              <p>{formErrors.email}</p>
            </Form.Group>

            {/* 3rd FORM (ADDRESS) */}
            <Form.Group style={{ width: '100%' }} className="mb-3" controlId="formBasicEmail" >
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Adress" name='address' value={formValues.address} onChange={handleChange} />
              <p>{formErrors.password}</p>
            </Form.Group >

            {/* 4th FORM (AGENCY) */}
            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="formBasicEmail">
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Agency" name='agency' value={formValues.agency} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="TYPE OF ID" name='typeid' value={formValues.typeid} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="ID NUMBER" name='idnum' value={formValues.idnum} onChange={handleChange} />
            </Form.Group>

            {/* 5th FORM EMAIL */}
            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="formBasicEmail">
              <Form.Control style={{ height: '50px' }} type="email" placeholder="E-mail" name='email' value={formValues.email} onChange={handleChange} />
            </Form.Group>

            {/* 6th Form (Passwords) */}
            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="formBasicEmail" >
              <Form.Control style={{ height: '50px' }} type="password" placeholder="Enter Password" name='firstpass' value={formValues.firstpass} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="password" placeholder="Confirm Password" name='secondpass' value={formValues.secondpass} onChange={handleChange} />
              <p>{formErrors.password}</p>
            </Form.Group >

            {/* 7th FORM EMERGENCY CONTACT NAME */}
            <h3>EMERGENCY CONTACT</h3>
            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="formBasicEmail">
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Name" name='ename' value={formValues.ename} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Contact Info" name='econtact' value={formValues.econtact} onChange={handleChange} />
              <Form.Control style={{ height: '50px' }} type="text" placeholder="Address" name='eaddress' value={formValues.eaddress} onChange={handleChange} />
              <p>{formErrors.email}</p>
            </Form.Group>
            {/* 8th FORM  (TERMS CONDITION)  */}

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check style={{}} type="checkbox" label="TERMS AND CONDITION" />
            </Form.Group>
            <Button style={{ width: '450px', height: '50px', marginTop: '20px' }} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Card>
    </>
  )
}
