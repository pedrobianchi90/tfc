import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.homeRanking);

export default leaderboardRouter;
