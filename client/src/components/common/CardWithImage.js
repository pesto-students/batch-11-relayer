import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import InfoCard from './InfoCard';
import Image from './Image';

const CardWithImage = ({
  small, medium, large, cardInfo,
}) => {
  return (
    <>
      <Image />
      <Col sm={small} md={medium} lg={large}>
        <InfoCard cardInfo={cardInfo} />
      </Col>
    </>
  );
};
CardWithImage.propTypes = {
  small: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  cardInfo: PropTypes.shape({ root: PropTypes.object }).isRequired,
};
export default CardWithImage;
