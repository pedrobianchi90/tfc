import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { homeMock, awayMock } from './mocks/leaderboard.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota leaderboard', () => {
  describe('quando aparece todas as partidas jogadas em casa', () => {
    it('deve retornar um status 200', async () => {
      const response = await chai
      .request(app)
      .get('/leaderboard/home')
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(homeMock);
    })
  })

  describe('quando aparece todas as partidas jogadas fora de casa', () => {
    it('deve retornar um status 200', async () => {
      const response = await chai
      .request(app)
      .get('/leaderboard/away')
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(awayMock);
    })
  })
})