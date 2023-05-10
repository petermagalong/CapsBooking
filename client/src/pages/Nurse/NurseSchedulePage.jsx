
import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Appointmentcolumns, columns, tableData } from '../../CapsConstant'
import { Col, Form, Row } from 'react-bootstrap'
import { getPatientsAppointments } from '../../services/accounts'


export default function NurseSchedulePage() {
  const [appointmentData, setAppointmentData] = useState([])
  const [filterByStatus, setFilterByStatus] = useState('All');
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if([name] == 'filterBystatus')
    {
      setFilterByStatus(value)
    }

    if([name] =='search'){
      console.log('asdfggghjklhgfdxszsss')
      setSearch(value)
    }
    
  }

const patientAppointmentRecords =async () => {
 const result =  await getPatientsAppointments({search,filterByStatus});
 setAppointmentData(result.data)
 console.log(appointmentData.status,"result")
}


useEffect(()=>{
  patientAppointmentRecords()
},[filterByStatus,search])
  
  return (
    <UserSidebar>
    <Form>
      <Row className="align-items-center">
        {/* <Col xs="auto">
        <Form.Label htmlFor="inlineFormInput" >
            Start : 
          </Form.Label>
          <Form.Control
            type="date"
            className="mb-2"
            id="inlineFormInput"
            placeholder="Jane Doe"
            value={startDate} onChange={handleStartDateChange}
          />
          
        </Col> */}
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
      <UserTable data={appointmentData.status} columns={Appointmentcolumns} hover={true} striped={true} />
    </UserSidebar>
  )
}
