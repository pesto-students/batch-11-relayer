import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import UserIcon from '../../assets/icons/user-circle-solid.svg';

const Header = () => (
  <Navbar color="primary" dark>
    <NavbarBrand style={{ fontSize: 'x-large' }} className="ml-0 ml-lg-5" href="/"> Relayer </NavbarBrand>
    <img className="mr-5" src={UserIcon} alt="user-icon" width="30px" height="50px" />
  </Navbar>
);

export default Header;
