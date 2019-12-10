import React from 'react';
import {
  Card, CardBody, CardText, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';

const InfoCard = ({ cardInfo }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{cardInfo.cardTitle}</CardTitle>
        <CardText>{cardInfo.cardBody}</CardText>
      </CardBody>
    </Card>
  );
};

InfoCard.propTypes = {
  cardInfo: PropTypes.shape({ cardTitle: PropTypes.string, cardBody: PropTypes.string }).isRequired,
};

export default InfoCard;
