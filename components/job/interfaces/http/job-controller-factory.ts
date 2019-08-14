import {JobController} from "./job-controller";
import {JobManager} from "../../application/job-manager";
import {JobRepositoryImpl} from "../../infrastructure/job-repository-impl";

export default { build: () => new JobController(new JobManager(new JobRepositoryImpl())) }
