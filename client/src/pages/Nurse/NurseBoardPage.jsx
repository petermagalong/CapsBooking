import React, { useState, useEffect } from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Doctorscolumns, columns, tableData } from '../../CapsConstant'
import { getActiveDoctors } from '../../services/accounts'
import { Button, Container, Form } from 'react-bootstrap'

export default function NurseBoardPage() {

  const [activeDoctors, setActiveDoctors] = useState([])

  const getActiveDoctorsValue = async () => {
    const result = await getActiveDoctors()
    setActiveDoctors(result.data)
  }
  useEffect(() => {
    getActiveDoctorsValue()
  }, [])
  return (
    <UserSidebar>
      <Container style={{ width: '100%', marginTop: '50px', border: 'none', display: 'flex', justifyContent: 'flex-end', padding: '0px 20px', alignItems: 'center' }} >
        <Form.Control
          style={{ width: '350px', margin: '8px 10px' }}
          type="text"
          className="mb-2"
          id="inlineFormInput"
          name="search"
          placeholder="Search..."
        // value={search} onChange={handleChange}

        />
        <Button style={{ width: 'max-content' }}>Add New</Button>
      </Container>
      <UserTable data={activeDoctors.status} columns={Doctorscolumns} hover={false} striped={true} />
    </UserSidebar>
  )
}
