import React from 'react';
import { Row } from 'reactstrap';
import SelectApp from './SelectApp';
import SelectTrigger from './SelectTrigger';
import prepareRequest from '../../../utils/requestEPLib';
import request from '../../../utils/requestLib';

class SelectRelay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appDetails: [],
    };
  }

  async componentDidMount() {
    const requestObject = prepareRequest('getAllApps');
    const response = await request(requestObject);
    this.setState({
      appDetails: response.body,
    });
  }

  render() {
    const { appDetails } = this.state;
    return (
      <>
        <Row>
          <SelectApp options={appDetails} />
        </Row>
        <Row className="mt-5">
          <SelectTrigger />
        </Row>
      </>
    );
  }
}

export default SelectRelay;
