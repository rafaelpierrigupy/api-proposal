import {JobController} from "./job-controller";
import {JobManager} from "../../application/job-manager";
import {JobRepository} from "../../infrastructure/job-repository";

export default { build: () => new JobController(new JobManager(new JobRepository())) }
