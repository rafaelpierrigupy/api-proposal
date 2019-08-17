/*
Esta interface define as operações de um Repositório. Um repositório é um serviço do
domínio da aplicação responsável pela persistência dos dados relativos a aquele domínio.
Apesar da persistência ser necessária em muitos sitemas de informação, é importante que
as regras de negócio funcionem independentemente dos mecanismos utilizados para fazer
persistência.
*/

import Candidate from "./candidate";

export default interface CandidateRepository {
  findCandidates(): Candidate[];
  saveCandidate(job: Candidate);
  findCandidate(jobId: number): Candidate;
  findNextCandidateId(): number;
}
