import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import logo from '../neko_white.png';
import { useState } from 'react';
import Manual from './Manual';

export default function KMNavbar(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary sticky-top">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-top me-2" />
            Keyboard Music
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="設定ファイル" id="nav-config-dropdown">
                <NavDropdown.Item href="#action/3.2" style={{
                  width: "20em"
                }}>
                  <Form.Control type="file" onChange={props.loadConfig} />
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.downloadDefault()}>基本設定のダウンロード</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="プリセット" id="nav-preset-dropdown">
                <NavDropdown.Item onClick={() => props.downloadDefault()}>default</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                onClick={() => setModalShow(true)}
              >マニュアル</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Manual show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
