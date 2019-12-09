import mongoose from 'mongoose';
import responseLib from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';

const AppsCollection = mongoose.model('AuthenticatedApps');
