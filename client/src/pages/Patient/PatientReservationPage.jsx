import React, { useState ,useEffect } from 'react';
import Calendar from 'react-calendar';
import UserSidebar from '../../components/UserSidebar'
import './patient.css'
import { Button, Card, Col, Dropdown, Form, ListGroup, Modal, Row, Stack } from 'react-bootstrap';
import moment from 'moment';
import { createPatientAppointment, getAppointmentCountByDay, getPatientsAppointment } from '../../services/accounts';
import TermsAndCondition from './TermsAndCondition';

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
  const [selectedItem, setSelectedItem] = useState("");
  const [errorMessage, setErrorMessage] = useState({ message: "", status: "" });
  const [isAge, setAges] = useState([])
  const handleValidate = () => {
    const age = localStorage.getItem('bday')

    const userAge = moment().diff(age, 'years')
    console.log(userAge)
    let item = []

    if (userAge >= 18 && userAge <= 45) {
      item = ['Local Employment', 'Overseas Pre-employment', 'Complete Laboratoty Diagnostic', 'Covid-19 Testing', 'Drug Test', 'X-ray']
    }
    else {
      item = ['Overseas Pre-employment', 'Complete Laboratoty Diagnostic', 'Covid-19 Testing', 'Drug Test', 'X-ray']
    }
    setAges(item);
  }

  const handleModal = () => {
    setCheckbox(false)
    IssetShow(true)
  }

  useEffect(() => {
    getAppointment()
    checkAvailableSlot(value)
    handleValidate()
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
  }
  const tileDisabled = () => {
    return true;
  };
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() + 2);
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
                maxDate={twoMonthsAgo}
                tileDisabled={getPatientAppointment?.status.length > 0 ? tileDisabled : ({ date, view }) =>
                  ((view === 'month' && date.getDay() === 0) || date.getDay() === 6)}
              />
            </Stack>
          </Col>
          <Col md={6}>
            <Stack style={{ display: 'flex', justifyContent: 'center' }} >
              <Button className='homePageButton'
                style={{ whiteSpace: 'nowrap', width: '550px', height: '80px', alignSelf: 'center' }}
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
                    <Stack className='stackReservation' style={{ padding: '20px 30px', marginTop: '10px', border: '1px solid black', borderRadius: '10px' }}>
                      <p className='reservationHeader'>One health medical Laboratory Inc</p>
                      <p style={{ fontSize: '11px', marginTop: '-20px', textAlign: 'center', color: '#414040', fontWeight: '500' }}>One Masangkay Place Building, 1420 G. Masangkay Street, City of Manila, Metro Manila</p>
                      <p><b>Reserved Date :</b> {getPatientAppointment.status[0].appointment_date}</p>
                      <p><b>Appointment Type :</b> {getPatientAppointment.status[0].appointment_type}</p>
                      <p><b>Appointment Status :</b> {getPatientAppointment.status[0].appointment_status}</p>
                      <p style={{ fontWeight: 700, textTransform: 'uppercase', textAlign: 'center', marginTop: '10px', color: 'Red', fontSize: '14px', textDecoration: 'underline' }}>*the first to arrive will be the first to have service provided*</p>
                    </Stack>
                    <Stack className='stackReservation' style={{ padding: '20px 30px', marginTop: '10px', border: '1px solid black', borderRadius: '10px' }}>
                      <p style={{ fontWeight: '600', color: 'red' }}>REMINDERS:</p>
                      <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">bring identification documents such as ID's, PWD Card, senior citizen identification card</ListGroup.Item>
                        <ListGroup.Item as="li">Bring your own Ballpen</ListGroup.Item>
                        <ListGroup.Item as="li" style={{ display: 'flex' }}>{' '}<p style={{ color: 'red' }}> Always wear facemask within the facility!</p></ListGroup.Item>
                      </ListGroup>
                    </Stack>
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
                    {isAge.map((item) => (
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
                    type="checkbox"
                    name='terms_and_condition'
                    onClick={handleModal}
                    label="TERMS AND CONDITION" />
                </Col>
              </Row>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ width: '700px', height: '60px', padding: '0px 15px' }}>
            <p style={{ color: 'red' }}>{errorMessage.message}</p>
            { }
            <Button style={{ width: '200px', textTransform: 'uppercase', fontWeight: 500 }} variant="primary" disabled={checkbox} onClick={handleBookAppointment}>
              Set Appointment
            </Button>

          </Modal.Footer>
        </Modal>

        <Modal show={isshow} onHide={termsClose}>
          <Modal.Header style={{ backgroundColor: '#3C1220' }} closeButton>
            <Modal.Title style={{ color: 'white', textAlign: 'center' }} >TERMS AND CONDITION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TermsAndCondition />
          </Modal.Body>
          <Modal.Footer>
            <p>By booking an appointment with us, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.</p>
            <Button variant="primary" onClick={termsClose}>
              I Understand
            </Button>
          </Modal.Footer>
        </Modal>
      </UserSidebar >

    </>
  );
}

