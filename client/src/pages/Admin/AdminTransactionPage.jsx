import React, { useState ,useEffect} from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Doctorscolumns, PatientLogscolumns, PatientTransactioncolumns, columns, tableData } from '../../CapsConstant'
import { createPatientLogs, download, getActiveDoctors, getPatientsAppointment, getPatientsAppointments } from '../../services/accounts'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Dropdown, Form, Row, Toast } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getInventoryItems, getPatientLogsItems } from '../../services/inventory'
import { createPatientTransactions, getPatientTransactions } from '../../services/transaction'

export default function AdminTransactionPage() {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [test, setTest] = useState('');
  const [patient_status, setpatient_status] = useState('');
  const [patientTransaction, setPatientTransaction] = useState([])
  const [toastShow, setToastShow] = useState(false);
  const [show, setShow] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateTransaction = async () => {
    console.log(patient_status,"@@patient_status")
    const formData = new FormData();
    formData.append('file', file);
    formData.append('test', test);
    formData.append('patient_status', patient_status);
    formData.append('appointment_id', id);

   const transaction = await createPatientTransactions(formData)

   console.log(transaction, "transactiontransaction")

  }

  const handleDownload = async (data) => {
    console.log(data, "ggggwoasdasdad")
      const result =   `http://localhost:3001/accounts/download/${data.result}`
      window.location.href = result;
  }


  const handleSetPatientTransactionValue = async() => { 
   const result = await getPatientTransactions(id)
   setPatientTransaction(result.data)
  }
  useEffect(()=>{
    handleSetPatientTransactionValue()
  },[])
  return (
    <UserSidebar>
            <Button variant="primary" onClick={handleShow}>
              Add Patient Transaction
            </Button>
      <UserTable data={patientTransaction.status} 
      columns={PatientTransactioncolumns} 
      hover={true} striped={true} 
      page='patienttransact'
       onClick={handleDownload} />

    <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Test</Form.Label>
              <Form.Control
                type="text"
                name="test"
                placeholder="0"
                onChange={(e) => setTest(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="patient_status"
                placeholder="0"
                onChange={(e) => setpatient_status(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Result</Form.Label>
              <Form.Control
                type="File"
                name="file"
                placeholder="0"
                onChange={handleFileChange}
                autoFocus
              />
            </Form.Group>
          </Form>
          </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateTransaction}>
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
