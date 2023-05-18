import React, { useState } from 'react';
import Calendar from 'react-calendar';
import UserSidebar from '../../components/UserSidebar'
import './patient.css'
import { Button, Card, Col, Dropdown, Form, Modal, Row, Stack } from 'react-bootstrap';
import moment from 'moment';
import { createPatientAppointment, getAppointmentCountByDay, getPatientsAppointment } from '../../services/accounts';
import { useEffect } from 'react';

export default function PatientReservationPage() {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isshow, IssetShow] = useState(false);
  const [slot, setSlot] = useState(0);
  const [getPatientAppointment, setgetPatientAppointment] = useState({ status: [] })
  const [appointmentCrete, setAppointmentcreate] = useState(false)
  const [checkbox, setCheckbox] = useState(true)

  const handleClose = () => setShow(false);
  const termsClose = () => IssetShow(false);
  const handleShow = () => setShow(true);

  const items = ['Overseas Pre-employment', 'Complete Laboratoty Diagnostic', 'Covid-19 Testing', 'Drug Test', 'X-ray']
  const [selectedItem, setSelectedItem] = useState("");
  const [errorMessage, setErrorMessage] = useState({ message: "", status: "" });

  const handleModal = () => {
    setCheckbox(false)
    IssetShow(true)
  }

  useEffect(() => {
    getAppointment()
    checkAvailableSlot(value)
  }, [value, appointmentCrete])

  const getAppointment = async () => {
    const uerId = localStorage.getItem("userId")
    const result = await getPatientsAppointment(uerId)
    setgetPatientAppointment(result.data)
  }

  const checkAvailableSlot = async (dateVal) => {
    const appointmentDate = moment(dateVal).format("YYYY-MM-DD")
    if (!dateVal) return
    const status = await getAppointmentCountByDay({ appointmentDate });
    const result = status.data.status.reserve_patient ? 100 - parseInt(status.data.status.reserve_patient) : 100;
    const count = result <= 0 ? 0 : result
    setSlot(count)
  }

  const handleBookAppointment = async () => {
    const payload = {
      userId: localStorage.getItem("userId"),
      appointment_type: selectedItem,
      appointment_date: moment(value).format("YYYY-MM-DD")
    }
    const result = await createPatientAppointment(payload)
    setErrorMessage(result.data)
    if (result.data.status === true) {
      setAppointmentcreate(true)
      handleClose()
    }
    console.log(result)
  }
  const tileDisabled = () => {
    return true;
  };
  console.log(getPatientAppointment, "getPatientAppointment.length")
  return (
    <>
      <UserSidebar>
        <Row className='rowContainer' >
          <Col md={6}>
            <Stack>
              <h2 style={{ margin: '8px', color: '#3C1220' }}>
                Please select your preferred Date:</h2>
              <Calendar
                className='react-calendar'
                onChange={onChange}
                value={value}
                minDate={new Date()}
                // tileDisabled={tileDisabled}
                tileDisabled={getPatientAppointment?.status.length > 0 ? tileDisabled : ({ date, view }) =>
                  ((view === 'month' && date.getDay() === 0) || date.getDay() === 6)}
              />
            </Stack>
          </Col>
          <Col md={6} >
            <Stack >
              <Button className='homePageButton'
                style={{ whiteSpace: 'nowrap', width: '550px', height: '80px' }}
                variant="primary" onClick={handleShow}
                disabled={getPatientAppointment?.status.length > 0}>
                {
                  getPatientAppointment?.status?.length && getPatientAppointment.status.length > 0 ? (
                    <h3>Reserved on {getPatientAppointment.status[0].appointment_date}</h3>
                  ) : (
                    <h3>Set Reservation on {value.toDateString()}</h3>
                  )
                }
              </Button>
              {
                getPatientAppointment?.status && getPatientAppointment?.status.length > 0 ? (
                  <>
                    Note: <h5 style={{ fontWeight: 400 }}>the first to arrive will be the first to have service provided</h5>
                    <p>Reserved Date : {getPatientAppointment.status[0].appointment_date}</p>
                    <p>Appointment Type : {getPatientAppointment.status[0].appointment_type}</p>
                    <p>Appointment Status : {getPatientAppointment.status[0].appointment_status}</p>
                  </>
                ) : ""
              }

              <Card>
              </Card>
            </Stack>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header className='modalHeader' closeButton>
            <Modal.Title>
              <h5 style={{ fontWeight: 400 }}> <b>NOTE:</b> The first to arrive will be the first to have service provided.</h5> </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: '30vh' }}>
            <Row className='rowModalTitle'>
              <Col className='modalDataTitle' md={4}>Date:</Col>
              <Col md={6}>{value.toDateString()}</Col>
            </Row>
            <Row className='rowModalTitle'>
              <Col className='modalDataTitle' md={4}>clinic hours:</Col>
              <Col md={6}>8:00 AM - 4:00 PM</Col>
            </Row>
            <Row className='rowModalTitle'>
              <Col className='modalDataTitle' md={4}>Slots Available:</Col>
              <Col md={6}>{slot.toString()}</Col>
            </Row>
            <Row className='rowModalTitle'>
              <Col className='modalDataTitle' md={4}>Appointment type:</Col>
              <Col md={6}>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary-outlined" id="dropdown-basic">
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
              <Row className='rowModalTitle'>
                <Col md={10} style={{ padding: '10px', height: '50px' }}>
                  <Form.Check style={{ color: 'black', marginBottom: '30px', fontWeight: 500 }}
                    // as={Button}
                    type="checkbox"
                    name='terms_and_condition'
                    onClick={handleModal}
                    // checked={formValues.terms_and_condition} onChange={handleChange} 
                    label="TERMS AND CONDITION" />
                </Col>
              </Row>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ width: '700px', height: '60px', padding: '0px 15px' }}>
            <p style={{ color: 'red' }}>{errorMessage.message}</p>
            {/* <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button> */}
            { }
            <Button style={{ width: '200px', textTransform: 'uppercase', fontWeight: 500 }} variant="primary" disabled={checkbox} onClick={handleBookAppointment}>
              Set Appointment
            </Button>

          </Modal.Footer>
        </Modal>

        <Modal show={isshow} onHide={termsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </UserSidebar >

    </>
  );
}

