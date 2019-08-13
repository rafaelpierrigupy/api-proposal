import JobStatus from "./job-status";

export default class Job {
  public id: number;
  public name: string;
  public status: JobStatus;

  constructor(id: number, name: string, status: JobStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
