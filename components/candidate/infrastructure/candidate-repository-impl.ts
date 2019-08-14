import Candidate from "../domain/candidate";
import CandidateRepository from "../domain/candidate-repository";

export class CandidateRepositoryImpl implements CandidateRepository {
  private static candidates: Candidate[] = [
      new Candidate(1, 'Jon Doe', 18, 2),
      new Candidate(2, 'Jane Doe', 35, 100)
  ];

  findCandidates(): Candidate[] {
    return CandidateRepositoryImpl.candidates;
  }

  saveCandidate(candidate: Candidate) {
    CandidateRepositoryImpl.candidates.push(candidate);
  }

  findCandidate(candidateId: number): Candidate {
    return CandidateRepositoryImpl.candidates.find((candidate: Candidate) => candidate.id === candidateId);
  }

  findNextCandidateId() {
    return CandidateRepositoryImpl.candidates.length + 1;
  }
}
