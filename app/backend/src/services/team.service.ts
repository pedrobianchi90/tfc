import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';

class TeamService {
  public findAll = async (): Promise<ITeam[] | []> => {
    const Teams = await Team.findAll();
    return Teams;
  };
}

export default new TeamService();
