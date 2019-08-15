import Candidate from "../domain/candidate";
import CandidateRepository from "../domain/candidate-repository";
import {CandidateProbe} from "../domain/candidate-probe";

export class CandidateRepositoryImpl implements CandidateRepository {
  private static candidates: Candidate[];
  private _probe: CandidateProbe;

  constructor(probe: CandidateProbe) {
    this._probe = probe;
    CandidateRepositoryImpl.candidates = [
      new Candidate(1, 'Jon Doe', 18, 2, probe),
      new Candidate(2, 'Jane Doe', 35, 100, probe)
    ];
  }

  findCandidates(): Candidate[] {
    return CandidateRepositoryImpl.candidates;
  }

  saveCandidate(newCandidate: Candidate) {
    const candidate = new Candidate(
      newCandidate.id,
      newCandidate.name,
      newCandidate.age,
      newCandidate.skillLevel,
      this._probe);
    const candidates = CandidateRepositoryImpl.candidates
        .filter(savedCandidate => savedCandidate.id !== candidate.id);
    candidates.push(candidate);
    CandidateRepositoryImpl.candidates = candidates;
  }

  findCandidate(candidateId: number): Candidate {
    return CandidateRepositoryImpl.candidates.find((candidate: Candidate) => candidate.id === candidateId);
  }

  findNextCandidateId() {
    return CandidateRepositoryImpl.candidates.length + 1;
  }
}
