import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenValidation from '../middlewares/authMiddleware';
import sameTeam from '../middlewares/sameTeamMiddleware';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/', matchController.findAll);
matchRouter.post('/', tokenValidation, sameTeam, matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);
// matchRouter.patch('/:id', matchController.updateMatch);

export default matchRouter;
