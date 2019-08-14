import {JobManager} from "../job/application/job-manager";
import {CandidateManager} from "../candidate/application/candidate-manager";
import ApplicationManager from "./application/application-manager";
import JobRepositoryImpl from "./infrastructure/job-repository-impl";
import CandidateRepositoryImpl from "./infrastructure/candidate-repository-impl";
import {ApplicationController} from "./interfaces/http/application-controller";

export default { build: (jobManager: JobManager, candidateManager: CandidateManager) => {
    const manager = new ApplicationManager(
        new JobRepositoryImpl(jobManager),
        new CandidateRepositoryImpl(candidateManager));
    const controller = new ApplicationController(manager);
    return { controller, manager };
  }
}
