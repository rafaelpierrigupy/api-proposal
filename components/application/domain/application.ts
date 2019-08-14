export default class Application {
  private _candidateId: number;
  private _skillLevel: number;

  constructor(candidateId: number, skillLevel: number) {
    this._candidateId = candidateId;
    this._skillLevel = skillLevel;

  }
  get candidateId(): number {
    return this._candidateId;
  }

  get skillLevel(): number {
    return this._skillLevel;
  }
}
