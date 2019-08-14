import Job from "../domain/job";
import JobRepository from "../domain/job-repository";

type NewJobType = {
  name: string;
  status: string;
}

type JobType = { id: number } & NewJobType;

export class JobManager {
  private jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.jobRepository = jobRepository;
  }

  findJobs(): JobType[] {
    return this.jobRepository.findJobs().map(job => this.toJobType(job));
  }

  createJob(data: NewJobType) {
    const nextId = this.jobRepository.findNextJobId();
    this.jobRepository.saveJob(new Job(nextId, data.name, data.status));
  }

  findJob(jobId: number): JobType {
    const job = this.jobRepository.findJob(jobId);
    if (!job) throw new Error('could_not_find_job');
    return this.toJobType(job);
  }

  private toJobType = (job: Job): JobType => ({ id: job.id, name: job.name, status: job.status })
}
