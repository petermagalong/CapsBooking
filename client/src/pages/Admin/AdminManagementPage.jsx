import React, { useEffect, useState } from 'react'
import UserTable from '../../components/UserTable'
import { Usercolumns, columns, tableData } from '../../CapsConstant'
import UserSidebar from '../../components/UserSidebar'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { getAllUser } from '../../services/accounts'

export default function AdminManagementPage() {
  const [getUserData,setUserData ] = useState([])

  const getAllUserData =async () =>{
    const result = await getAllUser()
    setUserData(result.res)
    
  }

  useEffect(()=>{
    getAllUserData()
  },[])
  return (
    <UserSidebar>
      {/* <Container style={{ width: '100%', marginTop: '50px', border: 'none', display: 'flex', justifyContent: 'flex-end', padding: '0px 20px', alignItems: 'center' }} >
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
      </Container> */}
      <UserTable data={getUserData.status} columns={Usercolumns} hover={false} striped={true} />
    </UserSidebar>
  )
}
