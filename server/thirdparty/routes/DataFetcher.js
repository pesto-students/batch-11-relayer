import { Router } from 'express';
import DataFetchController from '../controller/DataFetchController';

const router = Router();

router.post('/details', DataFetchController);

export default router;
