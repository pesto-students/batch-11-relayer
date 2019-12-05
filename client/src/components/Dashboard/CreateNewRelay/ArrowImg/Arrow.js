import React from 'react';
import ArrowRight from '../../../../assets/icons/angle-right-solid.svg';
import ArrowDown from '../../../../assets/icons/angle-down-solid.svg';

const mobileScreen = window.innerWidth <= 425;

const Arrow = () => {
  return <img src={(mobileScreen) ? ArrowDown : ArrowRight} alt="arrow" width="30px" />;
};

export default Arrow;
