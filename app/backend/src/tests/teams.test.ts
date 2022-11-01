import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;  

describe('Testa a rota /teams', () => {

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Retorna a lista completa de times', async () => {
    sinon.stub(Team, "findAll").resolves(teamsMock as Team[]);

    const response = await chai.request(app).get('/teams'); 
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });
});