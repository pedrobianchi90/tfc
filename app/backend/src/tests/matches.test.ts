import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { Response } from 'superagent';

import {
  allMatchesMock,
  matchesInProress,
  matchesNotInProgress,
  createdMatch,
  correctBodyToCreateMatch,
} from './mocks/matches.mock';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';
import { userMock } from './mocks/login.mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /matches', () => {
  
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(allMatchesMock as any[]);
      sinon.stub(Match, "findByPk").resolves(allMatchesMock[0] as any);
      sinon.stub(Match, "create").resolves(createdMatch as any);
      sinon.stub(jwt, "verify").resolves(userMock as User);
      sinon.stub(User, "findOne").resolves(userMock as User);
    })
  
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna todas as partidas na rota /matches', async () => {
      const response = await chai
         .request(app)
         .get('/matches');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatchesMock);
    });
  
    it('Retorna todas as partidas em progresso na rota /matches?inProgress=true', async () => {
      const response = await chai
         .request(app)
         .get('/matches?inProgress=true');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesInProress);
    });
  
    it('Retorna todas as partidas finalizadas na rota /matches?inProgress=false', async () => {
      const response = await chai
         .request(app)
         .get('/matches?inProgress=false');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesNotInProgress);
    });
  
    it('Finaliza uma partida corretamente', async () => {
      const response = await chai
         .request(app)
         .patch('/matches/1/finish')
         .send(correctBodyToCreateMatch);
  
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal('Finished');
    });
  
  });