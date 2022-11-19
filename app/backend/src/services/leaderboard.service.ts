import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import TeamService from './team.service';

class LeaderboardService {
  public totalVictories = 0;
  public totalLosses = 0;
  public totalDraws = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public findHomeMatches = async (team: number) => {
    const teams = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        homeTeam: team,
        inProgress: false,
      },
    });
    return teams;
  };

  public findHomeResults = (teams: Match[]) => {
    for (let i = 0; i < teams.length; i += 1) {
      const homeTeamGoals = teams[i]?.homeTeamGoals;
      const awayTeamGoals = teams[i]?.awayTeamGoals;
      if (homeTeamGoals > awayTeamGoals) {
        this.totalVictories += 1;
      }
      if (homeTeamGoals < awayTeamGoals) {
        this.totalLosses += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        this.totalDraws += 1;
      }
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
    }
  };

  public homeTeamData = (name: string) => {
    const totalPoints = this.totalVictories * 3 + this.totalDraws * 1;
    const totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    return {
      name,
      totalPoints,
      totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };

  public setData = () => {
    this.totalVictories = 0;
    this.totalLosses = 0;
    this.totalDraws = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  };

  public parameterRanking = (param1: number, param2: number): any => {
    if (param1 < param2) {
      return 1;
    }
    if (param1 > param2) {
      return -1;
    }
  };

  public rank = (array:any) => array.sort(
    (p1: any, p2: any) => {
      if (p1.totalPoints !== p2.totalPoints) {
        return this.parameterRanking(p1.totalPoints, p2.totalPoints);
      }
      if (p1.goalsBalance !== p2.goalsBalance) {
        return this.parameterRanking(p1.goalsBalance, p2.goalsBalance);
      }
      if (p1.goalsFavor !== p2.goalsFavor) {
        return this.parameterRanking(p1.goalsFavor, p2.goalsFavor);
      }
      if (p1.goalsOwn !== p2.goalsOwn) {
        return this.parameterRanking(p1.goalsOwn, p2.goalsOwn);
      }
      return 0;
    },
  );

  public homeRanking = async () => {
    const ranking = [];
    const teams = await this.teamService.findAll();
    const teamsName = teams.map((team) => team?.teamName);
    const result = teamsName.map(async (team, index) => {
      const homeMatches = await this.findHomeMatches(index + 1);
      return homeMatches;
    });
    const promises = await Promise.all(result);
    for (let indexTeam = 0; indexTeam < teamsName.length; indexTeam += 1) {
      this.findHomeResults(promises[indexTeam]);
      ranking[indexTeam] = this.homeTeamData(teamsName[indexTeam]);
      this.setData();
    }
    const sort = this.rank(ranking);
    return sort;
  };
}

export default LeaderboardService;
