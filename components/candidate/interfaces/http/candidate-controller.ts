import express = require('express');
import {CandidateManager} from "../../application/candidate-manager";

export class CandidateController {
  private candidateManager: CandidateManager;

  constructor(candidateManager: CandidateManager) {
    this.candidateManager = candidateManager;
  }

  private getCandidates = (req: express.Request, res: express.Response) => {
    const candidates = this.candidateManager.findCandidates();
    res.send({candidates});
  };

  private postCandidate = (req: express.Request, res: express.Response) => {
    try {
      const name: string = req.body.name;
      const age: number = req.body.age;
      const skillLevel: number = req.body.skillLevel;
      if (!name || !age || !skillLevel) throw new Error();
      this.candidateManager.createCandidate({name, age, skillLevel});
      res.status(201);
    } catch (e) {
      res.status(400);
    }
    res.send();
  };

  private getCandidate = (req: express.Request, res: express.Response) => {
    try {
      const candidate = this.candidateManager.findCandidate(parseInt(req.params.candidateId));
      res.send(candidate);
    } catch (e) {
      res.status(400);
      res.send();
    }
  };

  public subscribe(app: express.Application) {
    app.get('/candidates', this.getCandidates);
    app.post('/candidates', this.postCandidate);
    app.get('/candidates/:candidateId', this.getCandidate);
  }
}
