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

  set skillLevel(value: number) {
    this._skillLevel = value;
  }

  get skillLevel(): number {
    return this._skillLevel;
  }
}
