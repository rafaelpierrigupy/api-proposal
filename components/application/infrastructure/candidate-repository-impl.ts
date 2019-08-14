import Candidate from "../domain/candidate";
import CandidateRepository from "../domain/candidate-repository";
import {CandidateManager} from "../../candidate/application/candidate-manager";

export default class CandidateRepositoryImpl implements CandidateRepository {
  private candidateManager: CandidateManager;
  constructor(candidateManager: CandidateManager) {
    this.candidateManager = candidateManager;
  }

  findCandidate(candidateId: number): Candidate {
    const candidate = this.candidateManager.findCandidate(candidateId);
    return new Candidate(candidate.id, candidate.skillLevel);
  }
}
