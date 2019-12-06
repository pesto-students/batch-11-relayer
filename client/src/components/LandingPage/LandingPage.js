import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import '../../assets/styles/components/_landing-page.css';

const LandingPage = () => {
  return (
    <Container className="container mt-5">
      <h1> Relayer </h1>
      <p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
				non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <NavLink to="/signup">
        <Button size="lg" color="primary"> Get Started </Button>
      </NavLink>
    </Container>
  );
};
export default LandingPage;
