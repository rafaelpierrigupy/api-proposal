import JobStatus from "./job-status";

export default class Job {
  public id: number;
  public name: string;
  public status: JobStatus;

  constructor(id: number, name: string, status: string) {
    this.id = id;
    this.name = name;
    if (!JobStatus[status]) throw new Error();
    this.status = JobStatus[status];
  }
}
