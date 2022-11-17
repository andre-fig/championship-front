import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ColorSchemesExample() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link> <br />
          <Nav.Link href="/units">Units</Nav.Link> <br />
          <Nav.Link href="/fields">Fields</Nav.Link> <br />
          <Nav.Link href="/championships">Championships</Nav.Link> <br />
          {/* <Nav.Link href="/teams">Teams</Nav.Link> <br /> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
