import Job from "./job";

export default interface JobRepository {
  findJob(jobId: number): Job;
}
