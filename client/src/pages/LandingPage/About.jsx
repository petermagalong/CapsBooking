import { Button, Card, Container, Navbar } from "react-bootstrap";
const backgroundStyle = {
  margin: '0px',
  padding: '0px',
  width: '100vw',
  height: '92vh',
  backgroundPosition: 'center',
  backgroundImage: `url(images/bg6.png)`,
  backgroundSize: 'cover',
}
const backgroundOverlay = {
  backgroundColor: 'rgba(248, 204, 209, 0.62)',
  width: '100%',
  height: '92.5vh',
  padding: '80px',
}
function About() {
  return (
    <Card style={backgroundStyle}>
      <Card style={backgroundOverlay}>
        <h1 style={{ paddingBottom: '30px', color: '#3C1220' }}>Who we are: </h1>
        <h5 style={{ paddingBottom: '30px', color: '#0E1729' }}>We understand that your time is valuable,
          ONEHEALTH MEDICAL LABORATORY INC. WAS ESTABLISHED IN SEPTEMBER 2011 HEADED BY DR.
          MARIUS W. SING, MD, AN LICENSED OCCUPATIONAL HEALTH PHYSICIAN THAT GRADUATED FROM ST.
          LUKE’S COLLEGE OF MEDICINE IN 2007 AND LICENSED PHARMACIST FROM UNIVERSITY OF STO.TOMAS
          IN 1999. IT IS A REGISTERED CORPORATION UNDER SECURITIES AND EXCHANGE COMMISSION (SEC)
          AND LICENSED BY THE DEPARTMENT OF HEALTH (DOH) AS A DIAGNOSTIC LABORATORY. HIS GOAL IS
          TO GIVE QUALITY HEALTH CARE FOR THE PEOPLE AT A MINIMAL COST.
          DR SING THEN RECOGNIZED THE GROWTH IN THE PHILIPPINE MARKET, AND THE NEED FOR ADVANCED
          LABORATORY EQUIPMENTS, ONEHEALTH MEDICAL LABORATORY INC. STARTED VENTURING IN
          DIAGNOSTIC SUPPLIES. DEDICATED TO DELIVER QUALITY AND ACCURATE MEDICAL SYSTEMS AT COST
          EFFECTIVE PRICING.ONE HEALTH LABORATORY IS ALSO A TRADING COMPANY THAT PRIMARILY
          DISTRIBUTES ORTHOPEDIC IMPLANTS AND OTHER GOODS IN REGARD TO HEALTH CARE CONSUMABLES.
          ONE HEALTH LABORATORY IS A “ONE STOP SHOP” SERVICE FOR LABORATORY, EQUIPMENTS,
          REAGENTS AND CONSUMABLES</h5>
        <Button variant="outline-secondary" style={{ width: '250px', color: '#0E1729', }} size="lg" >Book Now</Button>
      </Card>
    </Card >
  );
}

export default About;