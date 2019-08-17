import {JobManager} from "../job/application/job-manager";
import {CandidateManager} from "../candidate/application/candidate-manager";
import ApplicationManager from "./application/application-manager";
import JobRepositoryImpl from "./infrastructure/job-repository-impl";
import CandidateRepositoryImpl from "./infrastructure/candidate-repository-impl";
import {ApplicationController} from "./interfaces/http/application-controller";
import ApplicationConsumer from "./interfaces/consumer/ApplicationConsumer";
import JobGateway from "./infrastructure/job-gateway";
import CandidateGateway from "./infrastructure/candidate-gateway";

/*
Este arquivo é uma implementação de uma Factory Method [1], seu objetivo é definir a instanciação de
uma classe a partir de parâmetros passados para o método. Especificamente, se o JobManager
ou o CandidateManger não forem oferecidos na invocação do método, a fábrica opta pelo uso dos Gateways.
Estes farão chamadas HTTP ao invés de acessar os Managers através dos RepositoryImpl. Ainda que esta
mudança seja importante, como tanto a implementação dos RepositoryImpl e dos Gateways atendem ao Princípio
de Substituição de Liskov [2], portanto, o ApplicationManager funciona alheio à esses detalhes.

[1] https://en.wikipedia.org/wiki/Factory_method_pattern
[2] https://codeburst.io/the-liskov-substitution-principle-5ba387055a2a
*/

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
