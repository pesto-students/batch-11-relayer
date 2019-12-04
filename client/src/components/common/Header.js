import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Usericon from '../../assets/icons/user-circle-solid.svg';

const Header = () => (
  <Navbar color="primary" dark>
    <NavbarBrand className="ml-5" href="/"> Relayer </NavbarBrand>
    <img className="mr-5" src={Usericon} alt="user-icon" width="40px" />
  </Navbar>
);

export default Header;
