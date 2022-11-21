export const allMatchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 16,
      teamName: "São Paulo"
    },
    teamAway: {
      id: 8,
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 9,
      teamName: "Internacional"
    },
    teamAway: {
      id: 14,
      teamName: "Santos"
    }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      id: 4,
      teamName: "Corinthians"
    },
    teamAway: {
      id: 11,
      teamName: "Napoli-SC"
    }
  }
]

export const matchesInProress = [
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      id: 4,
      teamName: "Corinthians"
    },
    teamAway: {
      id: 11,
      teamName: "Napoli-SC"
    }
  }
]

export const matchesNotInProgress = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 16,
      teamName: "São Paulo"
    },
    teamAway: {
      id: 8,
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 9,
      teamName: "Internacional"
    },
    teamAway: {
      id: 14,
      teamName: "Santos"
    }
  },
]

export const createdMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
}

export const correctBodyToCreateMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const incorrectBodyToCreateMatch1 = {
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const incorrectBodyToCreateMatch2 = {
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const incorrectBodyToCreateMatch3 = {
  homeTeam: 16,
  awayTeam: 8,
  awayTeamGoals: 2
}

export const equalTeamsBody = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const invalidTeamsBody = {
  homeTeam: 9999,
  awayTeam: 9998,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}
