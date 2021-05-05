import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import UploadModal from "./UploadModal";
import { handleLogout } from "../utils";

import "./appNavStyles.css";
import logo from "../res/logo_small.svg";

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
            props.setGallery(true);
          }}
        >
          <img src={logo} alt="ImageOcean" className="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setGallery(true);
                }}
              >
                Gallery
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setGallery(false);
                }}
              >
                Personal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }} onClick={toggleModal}>
                Upload
                <UploadModal
                  modal={modal}
                  toggle={toggleModal}
                  id={props.id}
                  setGalleryImages={props.setGalleryImages}
                  setPersonalImages={props.setPersonalImages}
                />
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText
            style={{ cursor: "pointer", float: "right" }}
            className="logout"
            onClick={() => handleLogout(props.setID, props.setPersonalImages)}
          >
            Log out
          </NavbarText>
        </Collapse>
      </Navbar>
      <div style={{ margin: "0 40px" }}>{props.children}</div>
    </div>
  );
};

export default AppNav;
