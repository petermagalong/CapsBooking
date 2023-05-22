import React, { useEffect, useState } from 'react'
import UserTable from '../../components/UserTable'
import { Usercolumns, columns, tableData } from '../../CapsConstant'
import UserSidebar from '../../components/UserSidebar'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { getAllUser } from '../../services/accounts'

export default function AdminManagementPage() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [getUserData,setUserData ] = useState([])

  const getAllUserData =async () =>{
    const result = await getAllUser()
    setUserData(result.res)
    
  }

  useEffect(()=>{
    getAllUserData()
  },[])
  return (
    <UserSidebar>
      <Container style={{ width: '100%', marginTop: '50px', border: 'none', display: 'flex', justifyContent: 'flex-end', padding: '0px 20px', alignItems: 'center' }} >
        <Form.Control
          style={{ width: '350px', margin: '8px 10px' }}
          type="text"
          className="mb-2"
          id="inlineFormInput"
          name="search"
          placeholder="Search..."
        // value={search} onChange={handleChange}

        />
        <Button style={{ width: 'max-content' }}  onClick={handleShow}>Add User</Button>
      </Container>
      <UserTable data={getUserData.status} columns={Usercolumns} hover={false} striped={true} />

      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Container>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="firsname"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                placeholder="middleName"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="lastName"
                autoFocus
              />
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="firstName"
                placeholder="firsname"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Gender</Form.Label>
              <Form.Select size="lg" name='gender' >
              <option value="male">Male</option>
              <option value="female">Female</option>
              </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <Form.Select size="lg" name='gender' >
              <option value="admin">Admin</option>
              <option value="nurse">nurse</option>
              <option value="clerk">clerk</option>
              </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                autoFocus
              />
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                placeholder="UserName"
                autoFocus
              />
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ConfirmPassword</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                autoFocus
              />
            </Form.Group>
            </Col>
          </Row>
          </Container>
          </Form>
          </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </UserSidebar>
  )
}
