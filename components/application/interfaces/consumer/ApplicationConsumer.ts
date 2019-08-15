import { socket } from 'zeromq';
import ApplicationManager from "../../application/application-manager";

export default class ApplicationConsumer {
  private sock: any;
  private applicationManager: ApplicationManager;

  constructor(applicationManager: ApplicationManager) {
    this.applicationManager = applicationManager;
    this.sock = socket('sub');
    this.sock.connect('tcp://127.0.0.1:2528');
    this.sock.subscribe('candidate_skill_level_changed');
    this.sock.on('message', (topic, message) => this.updateApplications(JSON.parse(message)));
  }

  private updateApplications(message: {candidateId: number, skillLevel: number}) {
    this.applicationManager.updateApplications(message.candidateId, message.skillLevel);
  }
}
