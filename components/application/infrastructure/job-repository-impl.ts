import Job from "../domain/job";
import JobRepository from "../domain/job-repository";
import Application from "../domain/application";
import {JobManager} from "../../job/application/job-manager";

export default class JobRepositoryImpl implements JobRepository {
  private jobManager: JobManager;
  private applications: Map<number, Application[]> = new Map();
  constructor(jobManager: JobManager) {
    this.jobManager = jobManager;
    this.applications.set(1, [new Application(1, 2)]);
    this.applications.set(2, [new Application(2, 100)]);
  }

  findJob(jobId: number): Job {
      const job = this.jobManager.findJob(jobId);
      const applications = this.applications.get(jobId);
      return new Job(job.id, job.status, applications);
  }
}
