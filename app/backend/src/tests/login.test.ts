import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import {
  userMock,
  validUser,
  emptyEmail,
  emptyPassword,
  invalidEmail,
  invalidPassword } from './mocks/login.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Faz login com sucesso e retorna um token', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    const response = await chai.request(app).post('/login').send(validUser);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.haveOwnProperty('token');
  });

  it('Retorna mensagem de erro se o campo de e-mail estiver vazio', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    const response = await chai.request(app).post('/login').send(emptyEmail)
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Retorna mensagem de erro se o campo de senha estiver vazio', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    const response = await chai.request(app).post('/login').send(emptyPassword)
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Retorna mensagem de erro se o e-mail não for válido', async () => {
    sinon.stub(User, "findOne").resolves(null);

    const response = await chai.request(app).post('/login').send(invalidEmail);
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });

  it('Retorna mensagem de erro se a senha não for válida', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    const response = await chai.request(app).post('/login').send(invalidPassword)
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });
});