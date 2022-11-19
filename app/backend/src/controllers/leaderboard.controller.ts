import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import statusCodes from '../utils/statusCodes';

class LeaderboardController {
  leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public homeRanking = async (req: Request, res: Response) => {
    const ranking = await this.leaderboardService.homeRanking();
    return res.status(statusCodes.ok).json(ranking);
  };
}

export default LeaderboardController;
