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

  // createMatch = async (req: Request, res: Response) => {
  //   const { body } = req.body;
  //   const match = await this.matchService.createMatch(body);
  //   return res.status(statusCodes.created).json(match);
  // };

  // createMatch = async (req: Request, res: Response) => {
  //   try {
  //     const { body } = req;

  //     const matchCreate = await this.matchService.createMatch(body);

  //     return res.status(201).json(matchCreate);
  //   } catch {
  //     return res.status(500).json({ message: 'Erro interno' });
  //   }
  // };

  createMatch = async (req: Request, res: Response) => {
    const insert = await this.matchService.createMatch(req.body);
    if (insert) {
      return res.status(201).json(insert);
    } return res.status(404).json({ message: 'There is no team with such id!' });
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    return res.status(statusCodes.ok).json({ message: 'Finished' });
  };
}

export default MatchController;
