import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DashboardNav = ({ activeTab, tabs, toggle }) => {
  return (
    <Nav tabs>
      {tabs.map((tab) => (
        <NavItem>
          <NavLink
            className={classnames({ active: tab.id === activeTab })}
            onClick={() => toggle(tab.id)}
          >
            {tab.name}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

DashboardNav.propTypes = {
  tabs: PropTypes.array,
  toggle: PropTypes.func,
}.isRequired;

export default DashboardNav;
