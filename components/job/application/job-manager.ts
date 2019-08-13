import Job from "../domain/job";
import {JobRepository} from "../infrastructure/job-repository";

type JobType = {
  id: number;
  name: string;
  status: string;
}

export class JobManager {
  private jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.jobRepository = jobRepository;
  }

  findJobs(): JobType[] {
    return this.jobRepository.findJobs().map(job => ({ id: job.id, name: job.name, status: job.status }));
  }

  createJob(data: JobType) {
    const job = this.jobRepository.findJob(data.id);
    if (job) throw new Error();
    this.jobRepository.saveJob(new Job(data.id, data.name, data.status));
  }

  findJob(jobId: number): JobType {
    const job = this.jobRepository.findJob(jobId);
    if (!job) throw new Error();
    return { id: job.id, name: job.name, status: job.status };
  }
}
