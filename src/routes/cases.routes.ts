import { Router } from 'express';
import casesController from "../controllers/cases.controller";

const router: Router = Router();

router.get('/cases', casesController.listCases);
router.get('/cases/:id', casesController.getCase);
router.post('/cases', casesController.createNewCase);
router.post('/cases/:id/resolve', casesController.resolveCase);

export default router;