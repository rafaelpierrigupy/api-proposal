import express = require('express');
import {JobManager} from "../../application/job-manager";

export class JobController {
  private jobManager: JobManager;

  constructor(jobManager: JobManager) {
    this.jobManager = jobManager;
  }

  private getJobs = (req: express.Request, res: express.Response) => {
    const jobs = this.jobManager.findJobs();
    res.send({jobs});
  };

  private postJob = (req: express.Request, res: express.Response) => {
    try {
      this.jobManager.createJob({id: req.body.id, name: req.body.name, status: req.body.status});
      res.status(201);
    } catch (e) {
      res.status(400);
    }
    res.send();
  };

  private getJob = (req: express.Request, res: express.Response) => {
    try {
      const job = this.jobManager.findJob(parseInt(req.params.jobId));
      res.send(job);
    } catch (e) {
      res.status(400);
      res.send();
    }
  };

  public subscribe(app: express.Application) {
    app.get('/jobs', this.getJobs);
    app.post('/jobs', this.postJob);
    app.get('/jobs/:jobId', this.getJob);
  }
}
