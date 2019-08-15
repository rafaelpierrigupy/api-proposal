import {socket} from 'zeromq';
import {CandidateProbe} from "../domain/candidate-probe";

export class CandidateProbeImpl implements CandidateProbe {
  private sock: any;
  constructor() {
    this.sock = socket('pub');
    this.sock.bindSync('tcp://127.0.0.1:2528')
  }

  skillLevelChanged(candidateId: number, skillLevel: number): void {
    this.sock.send(['candidate_skill_level_changed', JSON.stringify({ candidateId, skillLevel })]);
  }
}
