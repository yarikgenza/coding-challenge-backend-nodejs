import { EventEmitter } from 'events';
import CasesService from '../services/cases.service';

const handler: NodeJS.EventEmitter = new EventEmitter();

handler.on('officerAvailable', () => CasesService.assignPendingCases());

export default handler;