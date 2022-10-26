import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { userMock, validUser, invalidEmail } from './mocks/login.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
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

  it('Retorna mensagem de erro se o e-mail não for válido', async () => {
    sinon.stub(User, "findOne").resolves(null);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidEmail);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
});