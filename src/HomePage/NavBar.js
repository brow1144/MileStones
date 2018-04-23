import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import {Navbar, NavbarBrand, Collapse, NavbarNav, NavItem, NavLink, NavbarToggler,} from 'mdbreact';

const NavBar = (props) => {
  return (
    <Router>
      <Navbar color="grey lighten-5" expand="lg" fixed="top" scrolling>
        <NavbarBrand className='headerFont' style={{color: '#2196F3'}} href="#">
          MileStones
        </NavbarBrand>
        { !props.isWideEnough && <NavbarToggler style={{cursor: 'pointer', color: '#2196f3'}} onClick={props.onClick}><i className="fas fa-align-justify"/> </NavbarToggler>}
        <Collapse isOpen={props.collapse} navbar>
          <NavbarNav right>
            <NavItem onClick={props.toggle} style={{fontSize: '1.5em', cursor: 'pointer', color: '#2196f3'}} >
              <NavLink className="nav-link" to="/MileStones/Home">Add Event</NavLink>            
            </NavItem>
            <NavItem style={{fontSize: '1.5em', cursor: 'pointer', color: '#2196f3'}}>
              <NavLink onClick={props.handleSignOut} className="nav-link" to="">Sign Out</NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    </Router>
  );
}


export default NavBar;
