import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/', matchController.findAll);
// matchRouter.post('/', matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);

export default matchRouter;
