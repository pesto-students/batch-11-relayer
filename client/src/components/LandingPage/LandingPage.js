import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import styles from '../../assets/styles/components/landingPage.module.scss';
import logo from '../../assets/logo/relayer-logo.png';

const mapStateToProps = (state) => ({ auth: state.auth });

const LandingPage = ({ auth }) => {
  return (
    <Container className={`${styles.container}`}>
      <img src={logo} alt="relayer logo" />
      <p>
        Relayer is a bridge that connects one or more apps in multiple way.
        Helps you to create automation and perform actions.
      </p>
      <p>
        In simple words, makes life easier.
      </p>
      <NavLink to="/signup">
        <Button disabled={auth.isAuthenticated} size="lg" color="primary"> Get Started </Button>
      </NavLink>
    </Container>
  );
};

LandingPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(LandingPage);
