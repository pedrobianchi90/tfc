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

  public awayRanking = async (req: Request, res: Response) => {
    const ranking = await this.leaderboardService.awayRanking();
    return res.status(statusCodes.ok).json(ranking);
  };

  public generalRanking = async (req: Request, res: Response) => {
    const ranking = await this.leaderboardService.generalRanking();
    return res.status(statusCodes.ok).json(ranking);
  };
}

export default LeaderboardController;
