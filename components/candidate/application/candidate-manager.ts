import Candidate from "../domain/candidate";
import CandidateRepository from "../domain/candidate-repository";

type NewCandidateType = {
  name: string;
  age: number;
  skillLevel: number;
}

type CandidateType = { id: number } & NewCandidateType;

export class CandidateManager {
  private candidateRepository: CandidateRepository;

  constructor(candidateRepository: CandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  findCandidates(): CandidateType[] {
    return this.candidateRepository
      .findCandidates()
      .map(candidate => this.toCandidateType(candidate));
  }

  createCandidate(data: NewCandidateType) {
    const nextId = this.candidateRepository.findNextCandidateId();
    this.candidateRepository.saveCandidate(new Candidate(nextId, data.name, data.age, data.skillLevel));
  }

  findCandidate(candidateId: number): CandidateType {
    const candidate = this.candidateRepository.findCandidate(candidateId);
    if (!candidate) throw new Error('candidate_not_found');
    return this.toCandidateType(candidate);
  }

  updateCandidate(candidateId: number, skillLevel: number) {
    const candidate = this.candidateRepository.findCandidate(candidateId);
    if (!candidate) throw new Error('candidate_not_found');
    candidate.skillLevel = skillLevel;
    this.candidateRepository.saveCandidate(candidate);
  }

  private toCandidateType = (candidate: Candidate) => ({
    id: candidate.id,
    name: candidate.name,
    age: candidate.age,
    skillLevel: candidate.skillLevel
  });
}
