import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IMatch } from '../interfaces';

class MatchService {
  findAll = async (): Promise<IMatch[]> => {
    const matches = Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  inProgress = async (inProgress: boolean): Promise<IMatch[] | null> => {
    const matchesInProgress = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matchesInProgress;
  };
}

export default MatchService;
