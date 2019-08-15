import express = require('express');
import JobComponentFactory from './components/job/job-component-factory';
import CandidateComponentFactory from './components/candidate/candidate-component-factory';
import ApplicationComponentFactory from './components/application/application-component-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const apiComponent = process.env['API_COMPONENT'];

let jobComponent;
let candidateComponent;
let applicationComponent;

if (apiComponent === 'job' || !apiComponent) {
  jobComponent = JobComponentFactory.build();
  jobComponent.controller.subscribe(app);
}
if (apiComponent === 'candidate' || !apiComponent) {
  candidateComponent = CandidateComponentFactory.build();
  candidateComponent.controller.subscribe(app);
}

applicationComponent = ApplicationComponentFactory.build(
    jobComponent && jobComponent.manager,
    candidateComponent && candidateComponent.manager);
applicationComponent.controller.subscribe(app);

app.listen(process.env['API_PORT']);
