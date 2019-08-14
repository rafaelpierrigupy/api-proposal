import Candidate from "./candidate";

export default interface CandidateRepository {
  findCandidate(candidateId: number): Candidate;
}
