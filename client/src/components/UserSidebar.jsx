import React, { useCallback, useState } from 'react'
import { Button, Col, Navbar, Row, Stack } from 'react-bootstrap'
import { columns, sideBarData, tableData } from '../CapsConstant'
import './userSidebar.css'
import { Link } from 'react-router-dom'
import UserTable from './UserTable'

export default function UserSidebar() {

  const [isData, setData] = useState(false);
  const onShow = useCallback(() =>
    setData(true), []
  )

  const role = localStorage.getItem("role")
  return (
    <>
      <Navbar className="NavbarStyle" collapseOnSelect expand="lg" variant="dark" sticky="top">
        <Navbar.Brand as={Link} to="/home"><img className="navbarLogo" alt='CAPS' src='images/capslogo.png' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
      <Row>
        <Col style={{ height: '90vh', background: '#04061d', padding: '0px' }} xs={2}>
          {sideBarData.map(data => {
            if (data.role === role) {
              return (
                <Stack style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  {data.links.map(role => {
                    return (
                      <Button as={Link} to={role.path} onClick={onShow} className='usbButton'>
                        <h3>{role.name}</h3>
                      </Button>
                    )
                  })}
                </Stack>

              )
            }
          })}
        </Col>
        <Col style={{ backgroundColor: 'pink' }} xs={10}>
          {isData && <UserTable data={tableData} columns={columns} hover={true} striped={true} />}
        </Col>
      </Row>
    </>
  )
}
