import express = require('express');
import JobStatus from "../../domain/job-status";
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
      if (!Object.values(JobStatus).includes(req.body.status)) throw new Error();
      this.jobManager.createJob(req.body.id, req.body.name, req.body.status);
      res.status(201);
    } catch (e) {
      res.status(400);
    }
    res.send();
  };

  private getJob = (req: express.Request, res: express.Response) => {
    const job = this.jobManager.findJob(req.params.jobId);
    res.send(job);
  };

  public subscribe(app: express.Application) {
    app.get('/jobs', this.getJobs);
    app.post('/jobs', this.postJob);
    app.get('/jobs/:jobId', this.getJob);
  }
}
