import React, { useState } from 'react';
import { Container, Row } from 'reactstrap';
import MyAppsHeader from './MyAppsHeader';
import { CardWithImage, CustomModal } from '../../common';
import TaskButton from '../TaskHistory/TaskButton';

const css = { marginTop: '15px' };

const MyApps = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Container>
      <MyAppsHeader />
      <Row className="mt-5">
        <CardWithImage small="12" medium="4" large="4" cardInfo={{ cardTitle: 'App Name', cardBody: 'username' }} />
        <TaskButton content="Disconnect" click={toggle} styling={css} />
        <CustomModal
          _toggle={toggle}
          _modal={modal}
          _error="Cancel"
          _success="Disconnect"
          _successColor="danger"
          _modalTitle="Disconnect App"
          _modalBody={(
            <>
              <p>You have 3 Relays Connected to this App.</p>
              <p>Are you sure you want to disconnect?</p>
            </>
          )}
        />
      </Row>
    </Container>
  );
};

export default MyApps;
