import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { MenuIcon, VFG } from "../../common/icons/icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import "./menu.css";
import { useAuth } from "../../login/AuthContext";
import { LogOut } from "../../login/LogOut";

function Menu({ allServers, changeCompany }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(false);

  return (
    <Navbar bg="dark" variant="dark">
      <div className="ms-5 btn" onClick={handleShow}>
        <MenuIcon />
      </div>
      <span className="ms-3 text-light">Menú</span>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      <Container>
        <div className="mt-3 mb-2 ml-10">
          <div className="d-flex">
            <LogOut />
            <span className="ms-4"><VFG /></span>
            
          </div>
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse></Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
