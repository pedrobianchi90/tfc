import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/', matchController.findAll);

export default matchRouter;
