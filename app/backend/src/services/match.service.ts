import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IMatch } from '../interfaces';
// import customError from '../utils/errorHandler';

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

  // teamExists = async (id: number) => {
  //   const existingTeam = await Team.findOne({ where: { id } });

  //   if (!existingTeam) {
  //     customError('NotFound', 'There is no team with such id!');
  //   }

  //   return existingTeam;
  // };

  // compareTeam = (teamOne: number, teamTwo: number) => {
  //   if (teamOne === teamTwo) {
  //     customError(
  //       'UnprocessableEntity',
  //       'It is not possible to create a match with two equal teams',
  //     );
  //   }
  // };

  // createMatch = async (body: INewMatch) => {
  //   const { homeTeam, awayTeam } = body;

  //   await this.teamExists(homeTeam);
  //   await this.teamExists(awayTeam);

  //   this.compareTeam(homeTeam, awayTeam);

  //   const inProgress = true;
  //   const createdMatch = await Match.create({ ...body, inProgress });

  //   return createdMatch;
  // };

  createMatch = async (body: any) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const home = await this.findById(homeTeam);
    const away = await this.findById(awayTeam);
    if (!home || !away) {
      return null;
    }
    const query: any = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return query.dataValues;
  };

  finishMatch = async (id: number) => {
    const idQuery = Number(id);
    await Match.update({ inProgress: false }, { where: { id: idQuery } });
    return 'Finished';
  };
}

export default MatchService;
