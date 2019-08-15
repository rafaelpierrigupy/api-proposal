import Candidate from '../domain/candidate';
import CandidateRepository from '../domain/candidate-repository';
import request from 'sync-request';

export default class CandidateGateway implements CandidateRepository {
  findCandidate(candidateId: number): Candidate {
    const response = request('GET', `http://localhost:2526/candidates/${candidateId}`, {
      headers: {
        'Content-Type': 'application-json',
      },
    });
    const data = JSON.parse(response.getBody('utf-8'));
    return new Candidate(data.candidateId, data.skillLevel);
  }
}
