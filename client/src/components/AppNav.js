import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import UploadModal from "./UploadModal";

const AppNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.setRepository(true);
          }}
        >
          LOGO
        </NavbarBrand>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setRepository(true);
                }}
              >
                Repository
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setRepository(false);
                }}
              >
                My Images
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }} onClick={toggleModal}>
                Upload
                <UploadModal
                  modal={modal}
                  toggle={toggleModal}
                  setRepositoryImages={props.setRepositoryImages}
                />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {props.children}
    </div>
  );
};

export default AppNav;
