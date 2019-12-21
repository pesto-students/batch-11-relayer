/* eslint-disable no-tabs */
import React from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from 'reactstrap';
import Relay from './Relay';
import Pagination from '../../common/Pagination/Pagination';
import { usePageContext, PageProvider } from '../../../shared/PageProvider';
import { RelayState, RelayAction } from './relayHelper';
import callAPI from '../../../utils/apiCaller';
import * as env from '../../../utils/url.config';

const ShowRelays = ({ relays, fetchRelays }) => {
  const { itemsPerPage, currentPage } = usePageContext();
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  return relays.slice(firstItem, lastItem).map((relay) => (
    <Card key={relay.relayId} className="p-2">
      <CardBody>
        <Container>
          <Row>
            <Col xs={12} md={5}>
              <CardTitle>
                <Relay fetchRelays={fetchRelays} relay={relay} />
              </CardTitle>
              <CardText>
                  Last Modified: &nbsp;
                {new Date(relay.updatedAt).toLocaleDateString().split('/').join('-')}
              </CardText>
              <CardText>
                  Created On: &nbsp;
                {new Date(relay.createdAt).toLocaleDateString().split('/').join('-')}
              </CardText>
            </Col>
            <Col className="mt-3">
              <CardText>
                <RelayAction relay={relay} />
              </CardText>
              <CardText>
                <RelayState relay={relay} />
              </CardText>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  ));
};

const ShowAllRelays = () => {
  const [relays, setRelays] = React.useState([]);
  const fetchRelays = () => {
    callAPI(`${env.BASE_URL + env.GET_ALL_RELAYS}?isDeleted=false`, 'GET')
      .then((res) => {
        if (!res.error) {
          setRelays(res.body);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchRelays();
  }, relays);

  return (
    <PageProvider>
      <ShowRelays fetchRelays={fetchRelays} relays={relays} />
      <Pagination totalItems={relays.length} />
    </PageProvider>
  );
};

export default ShowAllRelays;
