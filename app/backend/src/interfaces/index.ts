export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface ILogin {
  email: string;
  password: string;
}

export interface TokenDecode {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface INewMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ITable {
  name: string;
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}
