import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import { columns, columnsTransaction, tableData } from '../../CapsConstant'
import UserTable from '../../components/UserTable'
import { getPatientTransaction } from '../../services/accounts'
import { Col, Form, InputGroup, Row, Button } from 'react-bootstrap'

export default function PatientTransacPage() {
  const [transactionData, setTransactionData] = useState([])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('All');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const renderTransactionData = async () => {
    console.log(filterByStatus, "GGGGGGGGGGGGGGGGGGGG")
    if ((startDate !== '' && endDate !== '') || startDate <= endDate) {
      const { data } = await getPatientTransaction({ userId: localStorage.getItem("userId"), startDate, endDate, filterByStatus })
      setTransactionData(data)
      return;
    }
    const { data } = await getPatientTransaction({ userId: localStorage.getItem("userId"), startDate: '', endDate: '', filterByStatus })
    setTransactionData(data)



    console.log(transactionData, "transactionDatatransactionData")
  }
  const handleChange = (e) => {
    const { value } = e.target;
    setFilterByStatus(value)
  }

  useEffect(() => {
    renderTransactionData()
  }, [startDate, endDate, filterByStatus])
  return (
    <UserSidebar>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
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

          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" >
              End :
            </Form.Label>
            <Form.Control
              type="date"
              className="mb-2"
              id="inlineFormInput"
              placeholder="Jane Doe"
              value={endDate} onChange={handleEndDateChange}

            />
          </Col>
          <Col>
            <Form.Label htmlFor="inlineFormInput" >
              FilterByStatus :
            </Form.Label>
            <Form.Select size="lg" name='filterBystatus' onChange={handleChange} value={filterByStatus}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Peding</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      <UserTable data={transactionData.status} columns={columnsTransaction} hover={false} striped={true} page='patienttransact' />
    </UserSidebar>
  )
}
