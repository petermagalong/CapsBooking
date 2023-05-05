import { Button, Card } from "react-bootstrap";
import "./styles.css";

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
  backgroundColor: 'rgba(74, 77, 137, 0.35)',
  height: '92.5vh',
  padding: '210px 90px',
}

function HomePage() {
  return (
    <Card style={backgroundStyle}>
      <Card style={backgroundOverlay}>
        <p style={{ paddingBottom: '30px', color: '#3C1220', fontSize: '50px', fontWeight: 500, textShadow: '2px 2px 4px #ffe5d3' }}>ONEHEALTH MEDICAL LABORATORY INC</p>
        <h5 style={{ paddingBottom: '30px', maxWidth: '650px', fontSize: '30px', color: '#0E1729' }}>We understand that your time is valuable,
          and we want to make sure you have the
          best care possible. That's why we work
          hard to give you the best experience
          possible when it comes to your medical
          needs.</h5>
        <Button className="homePageButton" size="lg" >Book Now</Button>
      </Card>
    </Card >
  );
}

export default HomePage;