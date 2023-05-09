import React, { useState } from 'react';
import Calendar from 'react-calendar';
import UserSidebar from '../../components/UserSidebar'
import './patient.css'
import { Button, Card, Col, Dropdown, Modal, Row, Stack } from 'react-bootstrap';
import moment from 'moment';
import { createPatientAppointment, getAppointmentCountByDay } from '../../services/accounts';
import { useEffect } from 'react';



export default function PatientReservationPage() {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState(0);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const items = ['Overseas Pre-employment', 'Complete Laboratoty Diagnostic', 'Covid-19 Testing' , 'Drug Test','X-ray']
  const [selectedItem, setSelectedItem] = useState("");
  const [errorMessage, setErrorMessage] = useState({message:"",status:""});

  useEffect(()=>{
    checkAvailableSlot(value)
  },[value])

  const checkAvailableSlot = async (dateVal) => {
   const appointmentDate =  moment(dateVal).format("YYYY-MM-DD")
   if(!dateVal) return 
    const status = await getAppointmentCountByDay({appointmentDate});
      const result = status.data.status.reserve_patient ? 100 - parseInt(status.data.status.reserve_patient) : 100;
    const count = result <= 0 ? 0 : result
    setSlot(count)
  }

  const handleBookAppointment =async () => {
    const payload = {
      userId:localStorage.getItem("userId"),
      appointment_type:selectedItem,
      appointment_date:moment(value).format("YYYY-MM-DD")
    }
    const result =  await createPatientAppointment(payload)
    setErrorMessage(result.data)
    console.log(result)
  }
  return (
    <>
    <UserSidebar>
     <Row>
     <Col md={6}>
      <Stack>
        <h2 style={{marginTop: '80px'}}>Please select your reffered Date:</h2>
      <Calendar
          className='react-calendar'
          onChange={onChange}
          value={value}
          minDate={new Date()}
          tileDisabled={({ date, view }) =>
          ((view === 'month' && date.getDay() === 0) || date.getDay() === 6)} />
      </Stack>
          </Col>
      <Col md={6} >
      <Stack style={{padding: '80px 30px'}}>
      <Button className='homePageButton' 
      style={{ marginTop: '90px',whiteSpace: 'nowrap', width: '100%', height: '100px',}} variant="primary" onClick={handleShow}>
        <h3>Set Reservation on {value.toDateString()}</h3>
      </Button>
      <Card>
      </Card>
      </Stack>
      </Col>
     </Row>
        
      <Modal show={show} onHide={handleClose }
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        <Modal.Header closeButton>
          <Modal.Title>Note: <h5 style={{fontWeight: 400}}>the first to arrive will be the first to have service provided</h5> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col style={{fontWeight: 600}} md={4}>Date:</Col>
            <Col md={4}>{value.toDateString()}</Col>
          </Row>
          <Row>
            <Col style={{fontWeight: 600}} md={4}>Slot Available:</Col>
            <Col md={4}>{slot.toString()}</Col>
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
        <p style={{ color: 'red' }}>{errorMessage.message}</p>
        {/* <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button> */}
          {}
          <Button variant="primary" onClick={handleBookAppointment}>
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
