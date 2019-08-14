import {ApplicationController} from "./application-controller";
import ApplicationManager from "../../application/application-manager";
import JobRepositoryImpl from "../../infrastructure/job-repository-impl";
import CandidateRepositoryImpl from "../../infrastructure/candidate-repository-impl";
import {JobManager} from "../../../job/application/job-manager";
import {CandidateManager} from "../../../candidate/application/candidate-manager";

export default { build: (jobManager: JobManager, candidateManager: CandidateManager) => new ApplicationController(
   new ApplicationManager(
     new JobRepositoryImpl(jobManager),
     new CandidateRepositoryImpl(candidateManager))) }
