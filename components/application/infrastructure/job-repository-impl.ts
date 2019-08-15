import Job from "../domain/job";
import JobRepository from "../domain/job-repository";
import {JobManager} from "../../job/application/job-manager";
import ApplicationRepository from "./application-repository";

export default class JobRepositoryImpl implements JobRepository {
  private jobManager: JobManager;
  constructor(jobManager: JobManager) {
    this.jobManager = jobManager;
  }

  findJob(jobId: number): Job {
    const job = this.jobManager.findJob(jobId);
    const applications = ApplicationRepository.applications.get(jobId);
    return new Job(job.id, job.status, applications);
  }

  saveJob(job: Job) {
    ApplicationRepository.applications.set(job.id, job.applications);
  }

  findJobsByCandidateId(candidateId: number): Job[] {
    const jobs: Job[] = [];
    ApplicationRepository.applications.forEach((value, key) => {
      const hasCandidate = value.some(application => application.candidateId === candidateId);
      if (hasCandidate) {
        jobs.push(this.findJob(key));
      }
    });
    return jobs;
  }
}
