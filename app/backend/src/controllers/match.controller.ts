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
    const insert = await this.matchService.createMatch(req.body);
    if (insert) {
      return res.status(statusCodes.created).json(insert);
    } return res.status(statusCodes.notFound).json({ message: 'There is no team with such id!' });
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    return res.status(statusCodes.ok).json({ message: 'Finished' });
  };
}

export default MatchController;
