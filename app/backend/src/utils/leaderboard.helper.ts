import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { ITable } from '../interfaces';

export default class Leaderboards {
  constructor(private leaderboard: Match[]) { }

  public totalPoints = (teams: Team) => {
    let points = 0;
    const victories = this.MatchesWithVictories(teams);
    const draws = this.MatchesWithDraws();

    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id) {
        points = victories * 3 + draws * 1;
      }
      if (match.awayTeam === teams.id) {
        points = victories * 3 + draws * 1;
      }
    });
    return points;
  };

  public totalMatches = (teams: Team) => {
    let matches = 0;
    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id) matches += 1;
      if (match.awayTeam === teams.id) matches += 1;
    });
    return matches;
  };

  public efficiencyOfTeam = (teams: Team) => {
    const points = this.totalPoints(teams);
    const games = this.totalMatches(teams);
    const percentage = ((points / (games * 3)) * 100);
    return percentage.toFixed(2);
  };

  public goalsScoreInFavor = (teams: Team) => {
    let goalsInFavor = 0;
    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id) goalsInFavor += match.homeTeamGoals;
      if (match.awayTeam === teams.id) goalsInFavor += match.awayTeamGoals;
    });
    return goalsInFavor;
  };

  public goalsConceded = (teams: Team) => {
    let goalsConceded = 0;
    this.leaderboard.forEach((match) => {
      if (match.awayTeam === teams.id) goalsConceded += match.homeTeamGoals;
      if (match.homeTeam === teams.id) goalsConceded += match.awayTeamGoals;
    });
    return goalsConceded;
  };

  public goalsBalance = (teams: Team) => {
    const goalsInFavor = this.goalsScoreInFavor(teams);
    const goalsConceded = this.goalsConceded(teams);
    const goalBalance = goalsInFavor - goalsConceded;
    return goalBalance;
  };

  public MatchesWithVictories = (teams: Team) => {
    let victories = 0;
    this.leaderboard.forEach((match) => {
      if (match.awayTeam === teams.id && match.homeTeamGoals < match.awayTeamGoals) victories += 1;
      if (match.homeTeam === teams.id && match.homeTeamGoals > match.awayTeamGoals) victories += 1;
    });
    return victories;
  };

  public MatchesWithDraws = () => {
    let draws = 0;
    this.leaderboard.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) draws += 1;
    });
    return draws;
  };

  public MatchesWithDefeat = (teams: Team) => {
    let defeat = 0;
    this.leaderboard.forEach((match) => {
      if (teams.id === match.awayTeam
        && match.homeTeamGoals > match.awayTeamGoals) defeat += 1;
      if (teams.id === match.homeTeam
        && match.homeTeamGoals < match.awayTeamGoals) defeat += 1;
    });
    return defeat;
  };

  public ResultTeams = (teams: Team):ITable => ({
    name: teams.teamName,
    totalPoints: this.totalPoints(teams),
    totalGames: this.totalMatches(teams),
    totalVictories: this.MatchesWithVictories(teams),
    totalDraws: this.MatchesWithDraws(),
    totalLosses: this.MatchesWithDefeat(teams),
    goalsFavor: this.goalsScoreInFavor(teams),
    goalsOwn: this.goalsConceded(teams),
    goalsBalance: this.goalsBalance(teams),
    efficiency: this.efficiencyOfTeam(teams),

  });
}
