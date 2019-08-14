import {CandidateManager} from './application/candidate-manager';
import {CandidateController} from './interfaces/http/candidate-controller';
import {CandidateRepositoryImpl} from "./infrastructure/candidate-repository-impl";

export default { build: () => {
    const manager = new CandidateManager(new CandidateRepositoryImpl());
    const controller = new CandidateController(manager);
    return { controller, manager };
  }
}
