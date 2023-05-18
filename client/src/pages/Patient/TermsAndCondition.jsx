import React from 'react'
import { Stack } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export default function TermsAndCondition() {
  return (
    <>
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">General</div>
            <Stack>
              <p>1.1 This medical appointment system is owned and operated by Onehealth. We reserve the right to modify or discontinue any part of the system at any time without notice.</p>
              <p>1.2 We are not responsible for any delays, interruptions, or errors that may occur during the booking process due to technical or other issues.</p>
              <p>
                1.3 We reserve the right to refuse or cancel any appointment at any time without notice
              </p>
            </Stack>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Booking Appointments</div>
            <Stack>
              <p>2.1 To book an appointment, you must provide accurate and complete information about yourself, including your name, contact details, and any relevant medical information.</p>
              <p>2.2 You are solely responsible for ensuring that the appointment time and date you select is suitable and convenient for you.</p>
              <p>
                2.3 Payment for the appointment will be due on the day of the appointment and must be paid at the clinic.
              </p>
            </Stack>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Medical Information</div>
            <Stack>
              <p>3.1 You acknowledge and agree that any medical information you provide to us is accurate and complete.</p>
              <p>3.2 We will use your medical information solely for the purpose of providing you with medical care and services.</p>
              <p>
                3.3 We will maintain the confidentiality of your medical information in accordance with applicable laws and regulations.
              </p>
            </Stack>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Limitation of Liability</div>
            <Stack>
              <p>4.1 We will not be liable for any loss, damage, or injury that you may incur as a result of using our medical appointment system, including but not limited to any delay or failure to provide medical care or services..</p>
              <p>
                4.2 We will not be liable for any indirect, incidental, or consequential damages arising from your use of our medical appointment system.
              </p>
              <p>
                4.2 We will not be liable for any indirect, incidental, or consequential damages arising from your use of our medical appointment system.
              </p>
            </Stack>
          </div>
        </ListGroup.Item>
      </ListGroup>

    </>
  )
}
