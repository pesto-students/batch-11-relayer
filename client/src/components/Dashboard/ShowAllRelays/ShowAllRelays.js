/* eslint-disable no-tabs */
import React from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';
import Relay from './Relay';
import Pagination from '../../common/Pagination/Pagination';
import { usePageContext, PageProvider } from '../../shared/PageProvider';
import relays from './dummyRelays';

const ShowRelays = () => {
  const { itemsPerPage, currentPage } = usePageContext();
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  return relays.slice(firstItem, lastItem).map((relay) => (
    <Card key={relay.id} className="p-2">
      <CardBody>
        <CardTitle>
          <Relay relay={relay} />
        </CardTitle>
        <CardText>
					Last Modified:
          {relay.lastModified}
        </CardText>
        <CardText>
					Created On:
          {relay.createdOn}
        </CardText>
      </CardBody>
    </Card>
  ));
};

const ShowAllRelays = () => {
  return (
    <PageProvider>
      <ShowRelays />
      <Pagination totalItems={relays.length} />
    </PageProvider>
  );
};

export default ShowAllRelays;
