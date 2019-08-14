import express = require('express');

type ApplicationType = {}

type ApplicationIdType = {jobId: number; candidateId: string};

class ApplicationManager {
  findApplications(): ApplicationType[] {
    return [];
  }

  createApplication(applicationId: ApplicationIdType) {

  }
}

export class ApplicationController {
  private applicationManager: ApplicationManager;

  constructor(ApplicationManager: ApplicationManager) {
    this.applicationManager = ApplicationManager;
  }

  private getApplications = (req: express.Request, res: express.Response) => {
    const applications = this.applicationManager.findApplications();
    res.send({applications});
  };

  private postApplication = (req: express.Request, res: express.Response) => {
    try{
      const candidateId: string = req.body.candidateId;
      const jobId: number = req.body.jobId;
      if (!candidateId || !jobId) throw new Error();
      this.applicationManager.createApplication({candidateId, jobId});
    } catch (e) {
      res.status(400);
    }
    res.send();
  };

  public subscribe(app: express.Application) {
    app.get('/applications', this.getApplications);
    app.post('/applications', this.postApplication);
  }
}
