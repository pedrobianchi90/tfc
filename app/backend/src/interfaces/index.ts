export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export interface ILogin {
  email: string;
  password: string;
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

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
