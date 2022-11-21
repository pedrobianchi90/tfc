import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.homeRanking);
leaderboardRouter.get('/away', leaderboardController.awayRanking);

export default leaderboardRouter;
