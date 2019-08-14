import {JobManager} from "./application/job-manager";
import {JobRepositoryImpl} from "./infrastructure/job-repository-impl";
import {JobController} from "./interfaces/http/job-controller";

export default { build: () => {
    const manager = new JobManager(new JobRepositoryImpl());
    const controller = new JobController(manager);
    return { controller, manager };
  }
}
