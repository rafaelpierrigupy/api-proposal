import {CandidateProbe, NullCandidateProbe} from "./candidate-probe";

export default class Candidate {
  public id: number;
  public name: string;
  public age: number;
  private _skillLevel: number;
  private _probe: CandidateProbe;

  constructor(id: number,
              name: string,
              age: number,
              skillLevel: number,
              probe: CandidateProbe = new NullCandidateProbe()) {
    this.id = id;
    this.name = name;
    if (age < 13) throw new Error('candidate_cannot_be_under_age_13');
    this.age = age;
    this._skillLevel = skillLevel;
    this._probe = probe;
  }

  get skillLevel(): number {
    return this._skillLevel;
  }

  set skillLevel(skillLevel: number) {
    this._skillLevel = skillLevel;
    this._probe.skillLevelChanged(this.id, skillLevel);
  }
}
