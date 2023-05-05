import Carousel from "react-elastic-carousel";
import "./styles.css";
import Item from "./item";
import { Card, CardGroup } from "react-bootstrap";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
function Services() {
  return (
    <>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          <Item className="Item">
            <Card className="CardMain">
              <img alt='CAPS' className="CardImg" src='images/Services/ME1.jpg' />
            </Card>
            <CardGroup className="CardItem">
              <h5 className="CardItemTitle">Local Pre-Employment Medical Examination</h5>
              <p className="CardItemBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, minus.</p>
            </CardGroup>
          </Item>
          <Item className="Item">
            <Card className="CardMain">
              <img alt='CAPS' className="CardImg" src='images/Services/ME2.jpg' />
            </Card>
            <CardGroup className="CardItem">
              <h5 className="CardItemTitle">Local Pre-Employment Medical Examination</h5>
              <p className="CardItemBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, minus.</p>
            </CardGroup>
          </Item>
          <Item className="Item">
            <Card className="CardMain">
              <img alt='CAPS' className="CardImg" src='images/Services/ME3.jpg' />
            </Card>
            <CardGroup className="CardItem">
              <h5 className="CardItemTitle">Local Pre-Employment Medical Examination</h5>
              <p className="CardItemBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, minus.</p>
            </CardGroup>
          </Item>
          <Item className="Item">
            <Card className="CardMain">
              <img alt='CAPS' className="CardImg" src='images/Services/ME4.jpg' />
            </Card>
            <CardGroup className="CardItem">
              <h5 className="CardItemTitle">Local Pre-Employment Medical Examination</h5>
              <p className="CardItemBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, minus.</p>
            </CardGroup>
          </Item>
          <Item className="Item">
            <Card className="CardMain">
              <img alt='CAPS' className="CardImg" src='images/Services/ME5.jpg' />
            </Card>
            <CardGroup className="CardItem">
              <h5 className="CardItemTitle">Local Pre-Employment Medical Examination</h5>
              <p className="CardItemBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, minus.</p>
            </CardGroup>
          </Item>
          <Item className="Item">
            <Card className="CardMain">
              <img alt='CAPS' className="CardImg" src='images/Services/ME6.jpg' />
            </Card>
            <CardGroup className="CardItem">
              <h5 className="CardItemTitle">Local Pre-Employment Medical Examination</h5>
              <p className="CardItemBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, minus.</p>
            </CardGroup>
          </Item>
        </Carousel>
      </div>
    </>
  );
}

export default Services;