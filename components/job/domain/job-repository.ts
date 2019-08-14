import Job from "./job";

export default interface JobRepository {
  findJobs(): Job[];
  saveJob(job: Job);
  findJob(jobId: number): Job;
  findNextJobId(): number;
}
