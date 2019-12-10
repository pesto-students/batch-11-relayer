import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

const RowCol = ({ rowStyle, colStyle, children }) => {
  return (
    <Row className={rowStyle}>
      <Col className={colStyle}>
        {children}
      </Col>
    </Row>
  );
};
RowCol.defaultProps = {
  colStyle: '',
  rowStyle: '',
};
RowCol.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  colStyle: PropTypes.string,
  rowStyle: PropTypes.string,
};

export default RowCol;
