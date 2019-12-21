import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, CardBody, CardTitle, CardText,
} from 'reactstrap';
import Filters from './Filters';
import callAPI from '../../../apiUtils/apiCaller';
import { BASE_URL, GET_TASK_HISTORY, GET_ALL_RELAYS } from '../../../apiUtils/url.config';
import getFormattedDate from '../../../utils/formatDateUtil';
import styles from '../../../assets/styles/components/taskhistory.module.scss';
import Pagination from '../../common/Pagination/Pagination';
import { usePageContext, PageProvider } from '../../shared/PageProvider';

const TaskHistory = () => {
  const [taskHistory, setTaskHistory] = useState([]);
  const [relays, setRelays] = useState([]);

  const getTaskHistory = async () => {
    const data = await callAPI(`${BASE_URL + GET_TASK_HISTORY}/?isRunning=true`, 'GET');
    setTaskHistory(data);
  };

  const getAllRelays = async () => {
    const data = await callAPI(BASE_URL + GET_ALL_RELAYS, 'GET');
    setRelays(data);
  };

  const onRelayChangeHandler = async (e) => {
    const relayId = e.target.value;
    const response = await callAPI(`${BASE_URL + GET_TASK_HISTORY}/?isRunning=true&relayId=${relayId}`, 'GET');
    setRelays(response);
  };

  const onStatusChangeHandler = async (e) => {
    const isRunning = e.target.value === 'Running';
    const response = await callAPI(`${BASE_URL + GET_TASK_HISTORY}/?isRunning=${isRunning}`, 'GET');
    setRelays(response);
  };

  useEffect(() => {
    getTaskHistory();
    getAllRelays();
  }, []);
  return (
    <Container>
      <Filters
        relays={relays}
        onSelectRelay={onRelayChangeHandler}
        onSelectStatus={onStatusChangeHandler}
      />
      <PageProvider>
        <ShowTaskHistory taskHistory={taskHistory} />
        <Pagination totalItems={taskHistory.length} />
      </PageProvider>
    </Container>
  );
};

const ShowTaskHistory = ({ taskHistory }) => {
  const { itemsPerPage, currentPage } = usePageContext();
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  return taskHistory.slice(firstItem, lastItem).map((task) => {
    return (
      <Row className="mt-5">
        <Col sm={12} md={12} lg={12}>
          <Card className={styles.cardShadow} key={task.relayId}>
            <CardBody>
              <CardTitle>
                <b>{'Relay Name <> '}</b>
                {' '}
                {task.relayName}
              </CardTitle>
              <CardText>
                <b>{'Last Action <> '}</b>
                {' '}
                {task.message}
              </CardText>
              <CardText>
                <b>{'Updated At <> '}</b>
                {' '}
                {getFormattedDate(task.updatedAt)}
              </CardText>
              <CardText>
                <b>{'Created At <> '}</b>
                {' '}
                {getFormattedDate(task.createdAt)}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  });
};

export default TaskHistory;
