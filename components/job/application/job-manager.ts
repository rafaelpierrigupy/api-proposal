import Job from "../domain/job";
import JobStatus from "../domain/job-status";
import {JobRepository} from "../infrastructure/job-repository";

export class JobManager {
  private jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.jobRepository = jobRepository;
  }

  findJobs(): Job[] {
    return this.jobRepository.findJobs();
  }

  createJob(id: number, name: string, status: JobStatus) {
    const job = this.jobRepository.findJob(id);
    if (job) throw new Error();
    this.jobRepository.saveJob(new Job(id, name, status));
  }

  findJob(jobId: number): Job {
    return this.jobRepository.findJob(jobId);
  }
}
