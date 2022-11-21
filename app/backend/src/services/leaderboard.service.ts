import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import Leaderboard from '../utils/leaderboard.helper';

class LeaderboardService {
  public matchesAndTeams = async () => {
    const teams = await Team.findAll();
    const finishedMatches = await Match.findAll({ where: { inProgress: false } });
    return { teams, finishedMatches };
  };

  public homeRanking = async () => {
    const { teams, finishedMatches } = await this.matchesAndTeams();

    const result = teams.map((team) => {
      const matches = finishedMatches.filter((match) => match.homeTeam === team.id);
      return new Leaderboard(matches).ResultTeams(team);
    });
    return result.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  };

  public awayRanking = async () => {
    const { teams, finishedMatches } = await this.matchesAndTeams();

    const result = teams.map((team) => {
      const matches = finishedMatches.filter((match) => match.awayTeam === team.id);
      return new Leaderboard(matches).ResultTeams(team);
    });
    return result.sort((a, c) => c.totalPoints - a.totalPoints
    || c.totalVictories - a.totalVictories
    || c.goalsBalance - a.goalsBalance
    || c.goalsFavor - a.goalsFavor
    || c.goalsOwn - a.goalsOwn);
  };
}

export default LeaderboardService;
