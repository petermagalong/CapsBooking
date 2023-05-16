import { Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Users from "./Form/User";
import "./styles.css";

import { loginAuth } from "../../services/accounts";
import { useNavigate } from 'react-router-dom';


function LogIn() {
  const initialValue = { email_address: "", password: "" }
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }
  const checkRoute = () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem("role")
    setIsLoggedIn(loggedIn)
    if (loggedIn && role === 'patient') {
      navigate('/user');
    }
    if (loggedIn && role === 'nurse') {
      navigate('/nurse');
    }
    if (loggedIn && role === 'admin') {
      navigate('/admin');
    }
    if (loggedIn && role === 'clerk') {
      navigate('/clerk');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, status } = await loginAuth(formValues)
    console.log(data, "dataaaa")

    if (status === 200) {
      setFormErrors({})
      localStorage.setItem("userId", data.status.userId)
      localStorage.setItem("role", data.status.role)
      localStorage.setItem("isLoggedIn", true)
      console.log(status, "gg")
      setIsLoggedIn(true)
    }

    setFormErrors({ errorVal: data.message })
  }
  // SAMPLE
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const status = 200;
  //   if (status === 200) {
  //     setFormErrors({})
  //     localStorage.setItem("userId", '200')
  //     localStorage.setItem("role", 'patient')
  //     localStorage.setItem("isLoggedIn", true)
  //     console.log(status, "gg")
  //     setIsLoggedIn(true)
  //   }

  //   // setFormErrors({ errorVal: data.message })
  // }
  useEffect(() => {
    checkRoute()
  }, [isLoggedIn])

  return (
    <>
      <Card style={{ background: 'linear-gradient(90deg, rgba(69,11,7,1) 0%, rgba(7,25,71,1) 100%)', height: '100%', paddingBottom: '100px' }}>
        <Row style={{ width: '100%' }}>
          <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px' }}>
            <Card style={{ width: '700px', marginTop: '100px', height: '70vh', borderRadius: '55px', background: 'linear-gradient(90deg, rgba(149,28,20,1) 0%, rgba(4,6,29,0.1881127450980392) 0%)', border: '1px solid #7e7053' }}>
              {Object.keys(formErrors).length === 0 && isLoggedIn ? (
                <div className="ui message success">Signed in successfully</div>
              ) : ''}
              <Form onSubmit={handleSubmit} style={{ padding: ' 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form.Group style={{ width: '100%' }} className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontSize: '2rem', color: '#d5a03b', display: 'flex', justifyContent: 'center' }}>Email address</Form.Label>
                  <Form.Control style={{ height: '50px' }} type="text" placeholder="Enter email" name='email_address' value={formValues.email_address || ""} onChange={handleChange} />
                  <Form.Text style={{ color: '#e6c78a', fontSize: '1rem', marginTop: '10px' }}>
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <p>{formErrors.email_address}</p>
                </Form.Group>
                <Form.Group style={{ width: '100%' }} className="mb-3" controlId="formBasicEmail" >
                  <Form.Label style={{ fontSize: '2rem', color: '#d5a03b', display: 'flex', justifyContent: 'center' }}>Password</Form.Label>
                  <Form.Control style={{ height: '50px' }} type="password" placeholder="Password" name='password' value={formValues.password || ""} onChange={handleChange} />
                  <p>{formErrors.password}</p>
                </Form.Group >
                <p style={{ color: 'red', textTransform: 'uppercase', fontSize: '14px' }} >{formErrors.errorVal}</p>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  // as={Link} to={"/user"} 
                  className="LogPageButton" size="lg">
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>

          <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px' }} >
            <p style={{ padding: '30px 0px', color: '#e6c78a', fontSize: '50px', fontWeight: 500, textShadow: '2px 2px 4px #3C1220' }}>ONEHEALTH MEDICAL LABORATORY INC</p>
            <h4 style={{ paddingBottom: '30px', maxWidth: '650px', fontSize: '25px', color: 'white', fontWeight: 500 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem beatae voluptatibus nobis? Pariatur, temporibus quo dolore veritatis mollitia quod modi distinctio provident asperiores debitis iure est totam qui eveniet. Modi iusto fuga
            </h4>
            <Card style={{ width: '800px', marginTop: '30px', height: '15vh', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '55px', background: 'linear-gradient(90deg, rgba(149,28,20,1) 0%, rgba(4,6,29,0.1881127450980392) 0%)', border: '1px solid #7e7053' }}>
              <h1 style={{ color: '#d5a03b', }}>Dont have an account yet ?</h1>
              <Button as={Link} to={"/signUp"} className="LogPageButton" variant="primary" size="lg">
                SignUp
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default LogIn;