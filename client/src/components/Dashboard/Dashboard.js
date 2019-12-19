import React, { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { DashboardNav, Tabs } from './index';
import styles from '../../assets/styles/components/dashboard.module.scss';

const tabs = [
  {
    id: 1,
    name: 'Relays',
  },
  {
    id: 2,
    name: 'My History',
  },
  {
    id: 3,
    name: 'My Apps',
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const toggleTab = (id) => {
    if (id !== activeTab) setActiveTab(id);
  };
  return (
    <Container className={styles.dashboard}>
      <Card>
        <CardHeader>
          <p className={`${styles.head1} ml-3 d-inline`}> Dashboard </p>
          <Link to="/create">
            <Button className="float-right mr-3" color="primary"> Create </Button>
          </Link>
        </CardHeader>
        <CardBody>
          <DashboardNav activeTab={activeTab} tabs={tabs} toggle={toggleTab} />
          <Tabs tabs={tabs} activeTab={activeTab} />
        </CardBody>
      </Card>
    </Container>
  );
};

export default Dashboard;
