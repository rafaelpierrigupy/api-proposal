import {CandidateController} from "./candidate-controller";
import {CandidateManager} from "../../application/candidate-manager";
import {CandidateRepositoryImpl} from "../../infrastructure/candidate-repository-impl";

export default { build: () => new CandidateController(new CandidateManager(new CandidateRepositoryImpl())) }
