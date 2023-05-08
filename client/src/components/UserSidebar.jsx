import React, { useCallback, useState } from 'react'
import { Button, Card, Col, Nav, NavLink, Navbar, Row, Stack } from 'react-bootstrap'
import { columns, sideBarData, tableData } from '../CapsConstant'
import { Link } from 'react-router-dom'
import UserTable from './UserTable'
import './userSidebar.css'
export default function UserSidebar(props) {

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
        <Navbar.Collapse className='navBarToggle' id="responsive-navbar-nav">
          <Nav >
            <Nav.Link className='navBaritem' as={Link}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        <Col className="Col1"
          style={{ height: '90vh', background: '#04061d', padding: '0px' }}
          xs={2}>
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
          {props.children}
          {/* {isData && <UserTable data={tableData} columns={columns} hover={true} striped={true} />} */}
        </Col>
      </Row>
    </>
  )
}
