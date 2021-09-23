import React from "react";
import { Nav, Dropdown, InputGroup, DropdownButton } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.nav`
  position: flex;
  top: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh !important;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 1);
  background : grey;
  .mb-3{
    margin-left= 20%;
  }
`;

const Side = (props) => {
  return (
    <>
      <Sidebar>
        <Nav
          className="col-md-12 d-none d-md-block bg-light sidebar"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`Rerounting ${selectedKey}`)}
        >
          <div className="sidebar-sticky" />
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <InputGroup className="mb-3">
              <DropdownButton
                as={Nav}
                variant="outline-secondary"
                title="edit"
                id="input-group-dropdown-1"
                
              >
                <Dropdown.Item href="/editProfile">Personal Info</Dropdown.Item>
                <Dropdown.Item href="/editAddress">Address</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
            {/* <Nav.Link href= "/editProfile" eventKey="Edit Profile">Edit Profile</Nav.Link> */}
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="workouts" href="/WorkoutList">
              Workouts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="measurement" href="/Measurement">
              Measurements
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="invite" href="/emailInvite">
              Email Invite
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="chat" href="/chat">
              Direct Message
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Sidebar>
    </>
  );
};
const SidebarRouter = withRouter(Side);
export default SidebarRouter;
