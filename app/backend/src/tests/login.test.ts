import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { userMock, validUser } from './mocks/login.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {

  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Faz login com sucesso e retorna um token', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validUser);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

//   before(async () => {
//     sinon
//       .stub(Example, "findOne")
//       .resolves({
//         ...<Seu mock>
//       } as Example);
//   });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});