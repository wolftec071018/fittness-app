import { Navbar, Nav, Form } from 'react-bootstrap';

const DashboardNav =() => {
    return(
        <Navbar bg="dark" variant="dark" expand="lg" >
          <Navbar.Brand href="/">Fitness App Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Dashboard">Home</Nav.Link>
            </Nav>
            <Form inline>
              <Nav.Link href="/">Sign out</Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    )
}
export default DashboardNav;
