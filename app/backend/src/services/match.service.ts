import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IMatch, IGoals } from '../interfaces';

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

  finishMatch = async (id: number) => {
    await Match.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  updateMatch = async (id: number, goals: IGoals) => {
    const { homeTeamGoals, awayTeamGoals } = goals;
    await Match.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
    const uptd = await Match.findOne({ where: { id } });
    return uptd;
  };
}

export default MatchService;
