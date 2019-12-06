import React from 'react';
import PropTypes from 'prop-types';
import RowCol from './RowCol';

const Heading = (props) => {
  const { title, styling } = props;
  return (
    <RowCol colStyle="align-center">
      <h3 className={styling}>{title}</h3>
    </RowCol>
  );
};

Heading.defaultProps = {
  styling: '',
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  styling: PropTypes.string,
};

export default Heading;
