import {CandidateManager} from './application/candidate-manager';
import {CandidateController} from './interfaces/http/candidate-controller';
import {CandidateRepositoryImpl} from "./infrastructure/candidate-repository-impl";
import {CandidateProbeImpl} from "./infrastructure/candidate-probe-impl";

export default { build: () => {
    const producer = new CandidateProbeImpl();
    const manager = new CandidateManager(new CandidateRepositoryImpl(producer));
    const controller = new CandidateController(manager);
    return { controller, manager };
  }
}
