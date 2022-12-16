import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Tooltip from '@mui/material/Tooltip';
export default function NavBar(props) {
  return (
    <Navbar variant="dark">
      <Container className="nav-bar">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              className="logo"
              src="/images/doable_logo_new.png"
              alt="logo"
            />
            <span className="nav-bar__doable">DOABLE</span>
          </Navbar.Brand>
        </LinkContainer>
        {props.user ? (
          <Nav>
            <i className="fa fa-search"></i>
            <i className="fa-regular fa-bell"></i>
            <Tooltip title={`This is me! A ${props.userName}!`} arrow>
              <img src={props.avatar} alt={props.userName} className="avatar" />
            </Tooltip>
            <NavDropdown
              align="end"
              title={props.userName}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <LinkContainer to="/projects">
                <NavDropdown.Item>Project History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <LinkContainer to="/">
                <NavDropdown.Item onClick={props.logout}>
                  Log Out
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        ) : (
          ''
        )}
      </Container>
    </Navbar>
  );
}
