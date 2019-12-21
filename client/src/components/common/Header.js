import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useUser } from '../../shared/UserProvider';
import { CustomModal } from './index';
import UserIcon from '../../assets/icons/user-circle-solid.svg';

const Header = () => {
  const { setUser } = useUser();
  const [modal, setModal] = React.useState(false);
  const toggle = () => {
    setModal(!modal);
    setUser({});
  };

  const { user } = useUser();
  const HeaderRigth = () => {
    if (user.status === 'SUCCESS') {
      return (
        <UncontrolledDropdown>
          <DropdownToggle caret color="primary" className="mr-5">
            <img className="mr-2" src={UserIcon} alt="user-icon" width="30px" height="50px" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> Profile </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={toggle} href="/"> Logout </DropdownItem>
          </DropdownMenu>
          <CustomModal
            _modalTitle="Confirmation"
            _modalBody="Are you sure you want to logout ?"
            _modal={modal}
            _successColor="primary"
            _toggle={() => setModal(!modal)}
            _error="No"
            _success="Yes"
            _onSuccess={toggle}
          />
        </UncontrolledDropdown>
      );
    }
    return (
      <NavLink to="/signin">
        <Button className="mr-5" color="light" outline> Sign In </Button>
      </NavLink>
    );
  };
  return (
    <Navbar color="primary" dark>
      <NavbarBrand
        style={{ fontSize: 'x-large' }}
        className="ml-0 ml-lg-5"
        href="/"
      >
        Relayer
      </NavbarBrand>
      <HeaderRigth />
    </Navbar>
  );
};

export default Header;
