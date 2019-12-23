import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomModal } from './index';
import UserIcon from '../../assets/icons/user-circle-solid.svg';
import { logoutUser } from '../../store/AuthActionCreator';
import { BASE_URL, POST_USER_SIGN_OUT } from '../../utils/url.config';

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
  logoutUser: (url) => dispatch(logoutUser(url)),
});


const Header = ({ auth, logoutUser, history }) => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => {
    setModal(!modal);
    const url = BASE_URL + POST_USER_SIGN_OUT;
    logoutUser(url);
    history.push('/');
  };

  const HeaderRigth = () => {
    if (auth.isAuthenticated) {
      return (
        <UncontrolledDropdown>
          <DropdownToggle caret color="primary" className="mr-5">
            <img className="mr-2" src={UserIcon} alt="user-icon" width="30px" height="50px" />
          </DropdownToggle>
          <DropdownMenu className="mr-4">
            <DropdownItem href="/dashboard"> Dashboard </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => setModal(!modal)}> Logout </DropdownItem>
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

Header.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  logoutUser: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
