import React, { useState ,useEffect} from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Doctorscolumns, PatientLogscolumns, columns, tableData } from '../../CapsConstant'
import { createPatientLogs, getActiveDoctors, getPatientsAppointment, getPatientsAppointments } from '../../services/accounts'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Dropdown, Form, Row, Toast } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getInventoryItems, getPatientLogsItems } from '../../services/inventory'

export default function NurseLogsPage() {
  const { id } = useParams();
  const initialValue = {  "appointmentId":id, "quantity":0, "spot": "" } 

  const [inventoryItems, setInventoryItems] = useState([])
  const [patientLogs, setPatientLogs] = useState([])
  const [toastShow, setToastShow] = useState(false);
  const [formValues, setFormvalues] = useState(initialValue);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value ,type, checked} = e.target;
    const newValue = type === 'checkbox' ? checked : value;
      setFormvalues({ ...formValues, [name]: newValue })
  }
  const getInventoryValue = async () => {
    const result = await getInventoryItems()
    setInventoryItems(result.data)
  }
  const handleSetAppointment = async () => {
    const result = await createPatientLogs(formValues)
    if(result.status === 200){
      setFormvalues({  "appointmentId":id, "quantity":0, "spot": "" })
      setToastShow(true)
      handleClose(false)
    }
  }

  const handleSetPatientLogsValue = async() => { 
   const result = await getPatientLogsItems(id)
   setPatientLogs(result.data)
  }
  useEffect(()=>{
    handleSetPatientLogsValue()
    getInventoryValue()
  },[])
  return (
    <UserSidebar>
            <Button variant="primary" onClick={handleShow}>
              Add Patient Logs
            </Button>
      <UserTable data={patientLogs.status} columns={PatientLogscolumns} hover={true} striped={true} />

    <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="0"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Item</Form.Label>
              <Form.Select size="lg" name='inventoryId' onChange={handleChange}>
                {inventoryItems?.status && inventoryItems?.status.length > 0 ? (
                  <>
                    <option value="">Select Item</option>
                    {inventoryItems.status.map(val => (
                      <option key={val.inventoryID} value={val.inventoryId}>{val.list}</option>
                    ))}
                  </>
                ) : null}
              </Form.Select>
            </Form.Group>
          </Form>
          </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSetAppointment}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    <Toast position="top-end" style={{ zIndex: 1 }} onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
          </Toast.Header>
          <Toast.Body>Patient Log Success !</Toast.Body>
        </Toast>
    </UserSidebar>

  )
}
