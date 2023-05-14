import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import UserSidebar from '../../components/UserSidebar';
import { getPatientDetails, getPatientIdDetails, updatePatientDetails, uploadFile } from '../../services/accounts';
import { DateFormat, handleKeyPress } from '../../util/dateFormat';
import moment from 'moment';
import { Card, Image } from 'react-bootstrap';
import { fetchformData } from '../../services/client';

export default function PatientProfilePage() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    role: "",
    middle_name: "",
    birthday: "",
    sex: "",
    address: "",
    contact_number: "",
    email_address: "",
    terms_and_condition: 1,
    patientId: 19,
    user_id: "",
    agency: "",
    ec_name: "",
    ec_contact_details: "",
    ec_address: "",
    type_of_id: "",
    id_number: "",
    file_path: ''
  });
  const [data, setData] = useState({});
  const [isMatch, setIsMatch] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange =async (event) => {
    setSelectedFile(event.target.files[0]);
    let formData = new FormData();
    formData.append("file", event.target.files[0]);

    const response = await fetchformData(`/accounts/upload?user_id=${localStorage.getItem("userId")}`, "POST",
      formData,
    );
    if(response.status === '200'){
      setFileUrl(response.data.status)
      
    }
    console.log(response,"heyheyhey");
  };

  const fetchData = async () => {
    const { data } = await getPatientDetails({ id: localStorage.getItem("userId") });
    setData(data.status);
    setUser({
      ...data.status
    });
  }

  useEffect(() => {
    
    fetchImage();
    fetchData();

  }, [fileUrl,selectedFile]);

  useEffect(() => {
    if (JSON.stringify(data) === JSON.stringify(user)) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [data, user]);



  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const payload = {
      id: localStorage.getItem("userId"),
      first_name: user.first_name || data.first_name,
      last_name: user.last_name || data.first_name,
      role: "patient",
      middle_name: user.middle_name || data.middle_name,
      birthday: user.birthday || data.birthday,
      sex: user.sex || data.sex,
      address: user.address || data.address,
      contact_number: user.contact_number || data.contact_number,
      agency: user.agency || data.agency,
      ec_name: user.ec_name || data.ec_name,
      ec_contact_details: user.ec_contact_details || data.ec_contact_details,
      ec_address: user.ec_address || data.ec_address,
      type_of_id: user.type_of_id || data.type_of_id,
      id_number: user.id_number || data.id_number,
      file_path: user.file_path || data.file_path,
    }
    const { res, status } = await updatePatientDetails(payload);
    if (status !== 200) {
      alert(res.message)
    }
    setValidated(true);
  };

  const fetchImage = async () => {
    try {
      console.log(user.file_path,"data.file_pathdata.file_path")
      const response = await getPatientIdDetails({payload:user.file_path||data.file_path}); // Replace with the actual image filename and extension


      // const imageBlob = await response.data.blob();
      // const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageUrl(response.data);

    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => ({
      ...user,
      [name]: value
    }));
  };

  const formatedDate = DateFormat(user.birthday)
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

  return (
    <UserSidebar>
      <Card style={{ backgroundColor: 'pink', marginTop: '50px', padding: '50px 90px', height: '100%' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* FNAME */}
            <Form.Group as={Col} md="4" >
              <Form.Label style={{ fontSize: '20px' }}>First name</Form.Label>
              <Form.Control
                type="text"
                id="first_name"
                name="first_name"
                value={user.first_name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {/* MIDDLE NAME */}
            <Form.Group as={Col} md="3" >
              <Form.Label>Middle name</Form.Label>
              <Form.Control
                type="text"
                id="middle_name"
                name="middle_name"
                value={user.middle_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* LNAME */}
            <Form.Group as={Col} md="3" >
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                id="last_name"
                name="last_name"
                value={user.last_name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {/* B_DATE */}
            <Form.Group as={Col} md="2" >
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                id="birthday"
                name="birthday"
                value={formatedDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* CONTACT # */}
            <Form.Group as={Col} md="3" >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                id="contact_number"
                name="contact_number"
                maxLength="11"
                onKeyPress={handleKeyPress}
                value={user.contact_number}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {/* AGENCY */}
            <Form.Group as={Col} md="3" >
              <Form.Label>Agency</Form.Label>
              <Form.Control
                type="text"
                id="agency"
                name="agency"
                value={user.agency}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {/* ADDRESS */}
            <Form.Group as={Col} md="5" >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">

            <h2 style={{ textAlign: 'center' }}>EMERGENCY CONTACT</h2>

            <Form.Group as={Col} md="4" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                id="ec_name"
                name="ec_name"
                value={user.ec_name}
                onChange={handleInputChange} red />
              <Form.Control.Feedback type="invalid">
                Please provide Emergency Contact.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                id="ec_contact_details"
                name="ec_contact_details"
                maxLength="11"
                onKeyPress={handleKeyPress}
                value={user.ec_contact_details}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid contact number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                id="ec_address"
                name="ec_address"
                value={user.ec_address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>

          </Row>
          <Row>
            <h2 style={{ textAlign: 'center' }} >ID</h2>
            {/* MIDDLE NAME */}
            <Form.Group as={Col} md="4" >
              <Form.Label>Type Of ID</Form.Label>
              <Form.Control
                id="type_of_id"
                name="type_of_id"
                value={user.type_of_id}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* LNAME  */}
            <Form.Group as={Col} md="4" >
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                id="id_number"
                name="id_number"
                value={user.id_number}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} md='4' className="position-relative mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                id="file_path"
                name="file_path"
                type="file" 
                onChange={handleFileChange}
              // onChange={handleChange}
              // isInvalid={!!errors.file}
              />
              <div>
              <img src={`http://localhost:3001/uploads/${user.file_path}`} alt="Image" style={{ width: '300px', height: '200px' }} />
            </div>
                <Form.Control.Feedback type="invalid" tooltip>
                {/* {errors.file} */}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" disabled={isMatch}>Edit</Button>
        </Form>
      </Card>
    </UserSidebar>
  )
}