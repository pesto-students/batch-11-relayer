import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import UserIcon from '../../assets/icons/user-circle-solid.svg';

const Header = () => (
  <Navbar color="primary" dark>
    <NavbarBrand className="ml-5" href="/">Relayer</NavbarBrand>
    <img className="mr-5" src={UserIcon} alt="user-icon" width="30px" />
  </Navbar>
);

export default Header;
