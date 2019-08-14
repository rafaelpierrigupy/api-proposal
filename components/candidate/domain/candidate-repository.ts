import Candidate from "./candidate";

export default interface CandidateRepository {
  findCandidates(): Candidate[];
  saveCandidate(job: Candidate);
  findCandidate(jobId: number): Candidate;
  findNextCandidateId(): number;
}
