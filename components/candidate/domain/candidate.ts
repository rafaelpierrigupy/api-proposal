export default class Candidate {
  public id: number;
  public name: string;
  private age: number;
  public skillLevel: number;

  constructor(id: number, name: string, age: number, skillLevel: number) {
    this.id = id;
    this.name = name;
    if (age < 13) throw new Error();
    this.age = age;
    this.skillLevel = skillLevel;
  }
}
