
import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Appointmentcolumns, } from '../../CapsConstant'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { getPatientsAppointments } from '../../services/accounts'
import { useNavigate } from 'react-router-dom'

function NurseSchedulePage() {
  const [appointmentData, setAppointmentData] = useState([])
  const [filterByStatus, setFilterByStatus] = useState('All');
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
  }

  const handleRedirect = (payload) => {
    navigate(`/nurse/logs/${payload.appointmentId}`)
  }

  const patientAppointmentRecords = async () => {
    const result = await getPatientsAppointments({ search, filterByStatus });
    setAppointmentData(result.data)
  }
  useEffect(() => {
    patientAppointmentRecords()
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
      />

      <Modal show={show} onHide={handleClose}>
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
    </UserSidebar>
  )
}

export default NurseSchedulePage;