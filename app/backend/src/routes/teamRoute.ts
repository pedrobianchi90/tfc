import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();
const teamRouter = Router();

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findById);

export default teamRouter;
