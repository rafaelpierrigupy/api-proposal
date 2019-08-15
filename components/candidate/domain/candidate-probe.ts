export interface CandidateProbe {
  skillLevelChanged(candidateId: number, skillLevel: number): void;
}

export class NullCandidateProbe implements CandidateProbe {
  skillLevelChanged(candidateId: number, skillLevel: number): void {
  }
}
