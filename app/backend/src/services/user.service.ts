import bcrypt = require('bcryptjs');
import Authentication from '../utils/authentication';
import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces';

export default class Login {
  public login = async (body: IUser) => {
    const { email, password } = body;
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      const data = bcrypt.compareSync(password, user.password);
      if (data) {
        const Auth = new Authentication();
        const token = Auth.generateToken(user);
        return token;
      } return null;
    } return null;
  };
}
