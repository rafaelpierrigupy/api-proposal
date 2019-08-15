import Job from "./job";

export default interface JobRepository {
  findJob(jobId: number): Job;
  saveJob(job: Job);
  findJobsByCandidateId(candidateId: number): Job[];
}
