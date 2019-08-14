import express = require('express');
import ApplicationManager from "../../application/application-manager";

export class ApplicationController {
  private applicationManager: ApplicationManager;

  constructor(ApplicationManager: ApplicationManager) {
    this.applicationManager = ApplicationManager;
  }

  private getApplications = (req: express.Request, res: express.Response) => {
    try {
      const jobId: number = parseInt(req.params.jobId);
      const applications = this.applicationManager.findApplications(jobId);
      res.send({applications});
    } catch (e) {
      console.log(e);
      res.status(400);
      res.send();
    }
  };

  private postApplication = (req: express.Request, res: express.Response) => {
    try{
      const candidateId: number = req.body.candidateId;
      const jobId: number = parseInt(req.params.jobId);
      if (!candidateId || !jobId) throw new Error('could_not_parse_request');
      this.applicationManager.createApplication({candidateId, jobId});
    } catch (e) {
      console.log(e);
      res.status(400);
    }
    res.send();
  };

  public subscribe(app: express.Application) {
    app.get('/jobs/:jobId/applications', this.getApplications);
    app.post('/jobs/:jobId/applications', this.postApplication);
  }
}
