import Job from "../domain/job";

export class JobRepository {
  private static jobs: Job[] = [];

  findJobs(): Job[] {
    return JobRepository.jobs;
  }

  saveJob(job: Job) {
    JobRepository.jobs.push(job);
  }

  findJob(jobId: number): Job {
    return JobRepository.jobs.find((job: Job) => job.id === jobId);
  }
}
