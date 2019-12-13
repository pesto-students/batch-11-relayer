import SlackDataFetchController from './SlackDataFetchController';

const DataFetchControllers = {
  SlackDataFetchController,
};

const DataFetchController = (req, res) => {
  const { AppName } = req.body;
  DataFetchControllers[`${AppName}DataFetchController`](req, res);
};

export default DataFetchController;
