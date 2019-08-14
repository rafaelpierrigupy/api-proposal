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
      const name = req.body.name;
      const status = req.body.status;
      if (!name || !status) throw new Error();
      this.jobManager.createJob({name: name, status: status});
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
