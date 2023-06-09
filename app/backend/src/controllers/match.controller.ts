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
    const { inProgress } = req.query;
    const matches = await this.matchService.findAll();

    if (inProgress === 'true') {
      const result = matches.filter((match) => match.inProgress === true);
      return res.status(statusCodes.ok).json(result);
    }

    if (inProgress === 'false') {
      const result = matches.filter((match) => match.inProgress === false);
      return res.status(statusCodes.ok).json(result);
    }
    return res.status(statusCodes.ok).json(matches);
  };

  createMatch = async (req: Request, res: Response) => {
    const insert = await this.matchService.createMatch(req.body, true);
    return res.status(statusCodes.created).json(insert);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    return res.status(statusCodes.ok).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    const update = await this.matchService.updateMatch(req.params.id, req.body);
    return res.status(statusCodes.ok).json({ message: update });
  };
}

export default MatchController;
