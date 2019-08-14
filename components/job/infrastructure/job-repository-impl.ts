import Job from "../domain/job";
import JobRepository from "../domain/job-repository";

export class JobRepositoryImpl implements JobRepository {
  private static jobs: Job[] = [
      new Job(1, 'Programmer', 'draft'),
      new Job(2, 'PO', 'published')
  ];

  findJobs(): Job[] {
    return JobRepositoryImpl.jobs;
  }

  saveJob(job: Job) {
    JobRepositoryImpl.jobs.push(job);
  }

  findJob(jobId: number): Job {
    return JobRepositoryImpl.jobs.find((job: Job) => job.id === jobId);
  }

  findNextJobId() {
    return JobRepositoryImpl.jobs.length + 1;
  }
}
