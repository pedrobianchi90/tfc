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

  findById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });
    return team;
  };

  public createMatch = (payload: IMatch, inProgress: boolean): Promise<IMatch> => {
    const matchCreated = Match.create({ ...payload, inProgress });

    return matchCreated;
  };

  finishMatch = async (id: number) => {
    const idQuery = Number(id);
    await Match.update({ inProgress: false }, { where: { id: idQuery } });
    return 'Finished';
  };

  updateMatch = async (id: string, params: any) => {
    const { homeTeamGoals, awayTeamGoals } = params;
    const idNumber = Number(id);
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id: idNumber },
    });
    return 'Match Updated!';
  };
}

export default MatchService;
