import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenValidation from '../middlewares/authMiddleware';
import sameTeam from '../middlewares/sameTeamMiddleware';
import teamExist from '../middlewares/teamExistMiddleware';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/', matchController.findAll);
matchRouter.post('/', tokenValidation, teamExist, sameTeam, matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);
matchRouter.patch('/:id', tokenValidation, matchController.updateMatch);

export default matchRouter;
