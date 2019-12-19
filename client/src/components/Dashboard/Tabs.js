import React from 'react';
import { TabPane, TabContent } from 'reactstrap';
import PropTypes from 'prop-types';
import { ShowAllRelays, TaskHistory, MyApps } from './index';

const Tabs = ({ tabs, activeTab }) => {
  return (
    <TabContent activeTab={activeTab}>
      <TabPane tabId={tabs[0].id}>
        <ShowAllRelays />
      </TabPane>
      <TabPane tabId={tabs[1].id}>
        <TaskHistory />
      </TabPane>
      <TabPane tabId={tabs[2].id}>
        <MyApps />
      </TabPane>
    </TabContent>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.number,
}.isRequired;

export default Tabs;
