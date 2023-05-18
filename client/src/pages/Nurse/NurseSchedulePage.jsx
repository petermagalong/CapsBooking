
import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Appointmentcolumns, } from '../../CapsConstant'
import { Button, Col, Container, Form, Modal, Row, Stack } from 'react-bootstrap'
import { getActiveDoctors, getPatientsAppointments, updatePatientAppointment } from '../../services/accounts'
import { useNavigate } from 'react-router-dom'

function NurseSchedulePage() {
  const initialValue = {  "id":0, "doctor_id":0, "appointment_status": "" } 
  const [appointmentData, setAppointmentData] = useState([])
  const [filterByStatus, setFilterByStatus] = useState('All');
  const [updateDetails, setUpdateDetails] = useState(initialValue)
  const [patientDetails,setPatientDetails] = useState({})
  const [doctorsList,setDoctorsList] = useState([])
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'filterBystatus') {
      setFilterByStatus(value)
    }

    if (name === 'search') {
      setSearch(value)
    }
    //action update
    console.log(name,"name moto",value)
    if (name === 'appointment_status' || name === 'doctor_id') {
      console.log("gg")
      setPatientDetails({...patientDetails, [name]:value})
    }
  }

  const handleRedirect = (payload) => {
    navigate(`/nurse/${payload.path}/${payload.appointmentId}`)
  }

  const patientAppointmentRecords = async () => {
    const result = await getPatientsAppointments({ search, filterByStatus });
    setAppointmentData(result.data)
  }

  const handleShowUpdate = (payload) => {
    if(payload)
    {
      setPatientDetails(payload)
    }
    handleShow()
  }

  const handleUpdate = async () => {

    if(patientDetails)
    {
    const result =await updatePatientAppointment(patientDetails)
    if(result.status === 200){
      window.alert("update success")
      handleClose()
      return
    }
    window.alert("update failed")
    }
    
  }

  const getInventoryValue = async () => {
    const result = await getActiveDoctors()
    setDoctorsList(result.data)
  }
  
  useEffect(() => {
    patientAppointmentRecords()
    getInventoryValue()
  }, [filterByStatus, search])

  return (
    <UserSidebar>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" >
              End :
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-2"
              id="inlineFormInput"
              name="search"
              placeholder="Search..."
              value={search} onChange={handleChange}

            />
          </Col>
          <Col>
            <Form.Label htmlFor="inlineFormInput" >
              FilterByStatus :
            </Form.Label>
            <Form.Select size="lg" name='filterBystatus' onChange={handleChange} value={filterByStatus}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      <UserTable
        data={appointmentData.status}
        columns={Appointmentcolumns}
        hover={true}
        striped={true}
        onClick={handleRedirect}
        action={{update:handleShowUpdate,result:handleRedirect}}
        page='schedule'
      />
  {/* patient transaction  */}



    {/* update patient status and doctor */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >PatientName:  </Form.Label>
              <Form.Label>{patientDetails.patient_name || ''}</Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label >Emergency Contact Details:  </Form.Label>
              <Stack direction="horizontal" gap={5}>
              
              <div className="mr-5"><Form.Label >Contact number : </Form.Label> {patientDetails.ec_contact_details || ''}</div>
              <div><Form.Label >Contact Person : </Form.Label> {patientDetails.ec_name || ''}</div>
              </Stack>          
              <div className="mt-2"><Form.Label>Address</Form.Label> :  {patientDetails.ec_address || ''}</div>
            </Form.Group>
          </Form>
          <Container>
      <Row>
        <Col>Status : 
        <Form.Select size="lg" name='appointment_status' onChange={handleChange} value={patientDetails.appointment_status} disabled={patientDetails.appointment_status==='completed'?true:false}>
        <option value="pending">Pending</option>
        <option value="approve">Approve</option>
        <option value="inprogress">Inprogress</option>
        <option value="completed">Completed</option>
        </Form.Select>
        </Col>
        <Col>Select doctor : 
        <Form.Select size="lg" value={patientDetails.doctor_id} name='doctor_id' onChange={handleChange} disabled={patientDetails.appointment_status==='completed'?true:false}>
          {doctorsList?.status && doctorsList?.status.length > 0 ? (
                <>
                  <option value="">Select doctor</option>
                  {doctorsList.status.map(val => (
                    <option key={val.doctorId} value={val.doctorId}>{val.doctor_name}</option>
                  ))}
                </>
              ) : null}
        </Form.Select>
        </Col>
      </Row>
      </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </UserSidebar>
  )
}

export default NurseSchedulePage;