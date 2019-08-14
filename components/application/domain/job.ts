import JobStatus from "./job-status";
import Application from "./application";
import Candidate from "./candidate";

export default class Job {
  private _jobId: number;
  private _status: JobStatus;
  private _applications: Application[];

  constructor(jobId: number, status: string, applications: Application[]) {
    this._jobId = jobId;
    if (!JobStatus[status]) throw new Error('invalid_job_status');
    this._status = JobStatus[status];
    this._applications = applications;
  }

  get applications(): Application[] {
    return this._applications;
  }

  apply(candidate: Candidate) {
    if (this._status === JobStatus.draft || this._status === JobStatus.closed) throw new Error('not_published_job');
    const newApplication = new Application(candidate.candidateId, candidate.skillLevel);
    const candidateHaveApplyed = this._applications
        .some(application => application.candidateId === candidate.candidateId);
    if (candidateHaveApplyed) throw new Error('candidate_already_applyed');
    this._applications.push(newApplication);
  }
}
