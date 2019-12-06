import React from 'react';
import { Row } from 'reactstrap';
import SelectApp from './SelectApp';
import SelectTrigger from './SelectTrigger';

class SelectRelay extends React.Component {
  // componentDidMount() {
  //   fetch('http://10.173.1.231:3001/api/get/all');
  // }

  render() {
    return (
      <>
        <Row>
          <SelectApp />
        </Row>
        <Row className="mt-5">
          <SelectTrigger />
        </Row>
      </>
    );
  }
}

export default SelectRelay;
