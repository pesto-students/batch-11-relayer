import { Router } from 'express';
import DataFetchController from '../controllers/DataFetchController';

const router = Router();

router.post('/details', DataFetchController);

export default router;
