import React, { useState } from 'react';
import Calendar from 'react-calendar';
import UserSidebar from '../../components/UserSidebar'
import './patient.css'
import { Button, Col, Dropdown, Modal, Row } from 'react-bootstrap';



export default function PatientReservationPage() {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const availability = '100'

  const items = ['Overseas Pre-employment', 'Complete Laboratoty Diagnostic', 'Covid-19 Testing' , 'Drug Test','X-ray']
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <>
    <UserSidebar>
        <Calendar
          className='react-calendar'
          onChange={onChange}
          value={value}
          minDate={new Date()}
          tileDisabled={({ date, view }) =>
          ((view === 'month' && date.getDay() === 0) || date.getDay() === 6)} />
        <Button className='homePageButton' style={{marginTop: '20px', whiteSpace: 'nowrap', width: '25vw'}} variant="primary" onClick={handleShow}>
        Set Reservation on {value.toDateString()}
      </Button>

      <Modal show={show} onHide={handleClose }
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        <Modal.Header closeButton>
          <Modal.Title>Kingina</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col style={{fontWeight: 600}} md={4}>Date:</Col>
            <Col md={4}>{value.toDateString()}</Col>
          </Row>
          <Row>
            <Col style={{fontWeight: 600}} md={4}>Slot Available:</Col>
            <Col md={4}>{availability}</Col>
          </Row>
          <Row>
            <Col style={{fontWeight: 600}} md={4}>Appointment type:</Col>
            <Col md={4}>
              <Dropdown >
              <Dropdown.Toggle size='xs' variant="secondary-outlined" id="dropdown-basic">
                {selectedItem}
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {items.map((item) => (
            <Dropdown.Item onClick={() => setSelectedItem(item)}>
              {item}
            </Dropdown.Item>
              ))}
              </Dropdown.Menu>
            </Dropdown>

            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        {/* <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </UserSidebar>
     
    </>
  );
}

// export default function PatientReservationPage() {
//   const [value, onChange] = useState(new Date());
//   return (
//     <>
      
//     </>



//   )
// }
