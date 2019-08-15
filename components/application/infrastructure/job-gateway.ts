import request from 'sync-request';
import JobRepository from "../domain/job-repository";
import Job from "../domain/job";
import ApplicationRepository from "./application-repository";

export default class JobGateway implements JobRepository {
  findJob(jobId: number): Job {
    const response = request('GET', `http://localhost:2527/jobs/${jobId}`, {
      headers: {
        'Content-Type': 'application-json',
      },
    });
    const data = JSON.parse(response.getBody('utf-8'));
    return new Job(data.candidateId, data.status, ApplicationRepository.applications.get(jobId));
  }

  saveJob(job: Job) {
    ApplicationRepository.applications.set(job.id, job.applications);
  }

  findJobsByCandidateId(candidateId: number): Job[] {
    const jobs: Job[] = [];
    ApplicationRepository.applications.forEach((value, key) => {
      const hasCandidate = value.some(application => application.candidateId === candidateId);
      if (hasCandidate) {
        jobs.push(this.findJob(key));
      }
    });
    return jobs;
  }
}
