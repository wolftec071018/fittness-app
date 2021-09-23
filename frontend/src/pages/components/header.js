import { Navbar, Nav, Form } from 'react-bootstrap';


const Header =() => {
return(
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Brand href="/">Fittness App Demo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Form inline>
          <Nav.Link href="/Login">Login</Nav.Link>
          <Nav.Link href="/SignUp">Sign Up</Nav.Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
)
}
export default Header;