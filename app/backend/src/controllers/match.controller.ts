import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import TeamService from '../services/team.service';
import statusCodes from '../utils/statusCodes';

class MatchController {
  matchService: MatchService;
  teamService: TeamService;
  constructor() {
    this.matchService = new MatchService();
    this.teamService = new TeamService();
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      let matches;

      if (inProgress) {
        const matchInProgess = inProgress === 'true';

        matches = await this.matchService.inProgress(matchInProgess);
      } else {
        matches = await this.matchService.findAll();
      }

      return res.status(statusCodes.ok).json(matches);
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export default MatchController;
