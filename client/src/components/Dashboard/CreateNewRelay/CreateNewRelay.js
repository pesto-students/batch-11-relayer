import React, { useEffect, useState } from 'react';
import {
  Container, Form,
} from 'reactstrap';
import RelaySelection from './RelaySelection';
import callAPI from '../../../apiUtils/apiCaller';
import { BASE_URL, GET_ALL_APPS } from '../../../apiUtils/url.config';
import { RelayProvider } from '../../../shared/RelayProvider';

const CreateNewRelay = () => {
  const [relayData, setRelayData] = useState([]);

  useEffect(() => {
    const getAppData = async () => {
      const data = await callAPI(BASE_URL + GET_ALL_APPS, 'GET');
      setRelayData(data);
    };
    getAppData();
  }, []);

  return (
    <Container>
      <Form>
        <RelayProvider>
          <RelaySelection appData={relayData} />
        </RelayProvider>
      </Form>
    </Container>
  );
};

export default CreateNewRelay;
