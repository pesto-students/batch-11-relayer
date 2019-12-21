import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import styles from '../../assets/styles/components/landingPage.module.scss';
import logo from '../../assets/logo/relayer-logo.png';

const LandingPage = () => {
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
        <Button size="lg" color="primary"> Get Started </Button>
      </NavLink>
    </Container>
  );
};
export default LandingPage;
