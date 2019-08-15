import {JobManager} from "../job/application/job-manager";
import {CandidateManager} from "../candidate/application/candidate-manager";
import ApplicationManager from "./application/application-manager";
import JobRepositoryImpl from "./infrastructure/job-repository-impl";
import CandidateRepositoryImpl from "./infrastructure/candidate-repository-impl";
import {ApplicationController} from "./interfaces/http/application-controller";
import ApplicationConsumer from "./interfaces/consumer/ApplicationConsumer";
import JobGateway from "./infrastructure/job-gateway";
import CandidateGateway from "./infrastructure/candidate-gateway";

export default { build: (jobManager?: JobManager, candidateManager?: CandidateManager) => {
    let manager;
    if (!jobManager || !candidateManager) {
      manager = new ApplicationManager(new JobGateway(), new CandidateGateway());
    } else {
      manager = new ApplicationManager(
        new JobRepositoryImpl(jobManager),
        new CandidateRepositoryImpl(candidateManager));
    }
    const controller = new ApplicationController(manager);
    const consumer = new ApplicationConsumer(manager);
    return { consumer, controller, manager };
  }
}
