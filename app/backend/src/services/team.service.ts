import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';

class TeamService {
  public findAll = async (): Promise<ITeam[] | []> => {
    const Teams = await Team.findAll();
    return Teams;
  };

  public findById = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    return team;
  };
}

export default new TeamService();
