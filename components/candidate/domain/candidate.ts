export default class Candidate {
  public id: number;
  public name: string;
  age: number;
  private _skillLevel: number;

  constructor(id: number, name: string, age: number, skillLevel: number) {
    this.id = id;
    this.name = name;
    if (age < 13) throw new Error('candidate_cannot_be_under_age_13');
    this.age = age;
    this._skillLevel = skillLevel;
  }

  get skillLevel(): number {
    return this._skillLevel;
  }

  set skillLevel(value: number) {
    this._skillLevel = value;
  }
}
