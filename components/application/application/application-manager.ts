import JobRepository from "../domain/job-repository";
import CandidateRepository from "../domain/candidate-repository";

type ApplicationType = {
  candidateId: number
  skillLevel: number;
}

type ApplicationIdType = {jobId: number; candidateId: number};

export default class ApplicationManager {
  private jobRepository: JobRepository;
  private candidateRepository: CandidateRepository;
  constructor(jobRepository: JobRepository, candidateRepository: CandidateRepository) {
    this.jobRepository = jobRepository;
    this.candidateRepository = candidateRepository;
  }

  findApplications(jobId: number): ApplicationType[] {
    const job = this.jobRepository.findJob(jobId);
    return this.toApplicationType(job);
  }

  createApplication(applicationId: ApplicationIdType) {
    const job = this.jobRepository.findJob(applicationId.jobId);
    const candidate = this.candidateRepository.findCandidate(applicationId.candidateId);
    job.apply(candidate);
    this.jobRepository.saveJob(job);
  }

  private toApplicationType = (job): ApplicationType[] =>
    job.applications.map(application => ({
      candidateId: application.candidateId,
      skillLevel: application.skillLevel
    }));
}
