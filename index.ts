import express = require('express');
import JobComponentFactory from './components/job/job-component-factory';
import CandidateComponentFactory from './components/candidate/candidate-component-factory';
import ApplicationComponentFactory from './components/application/application-component-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const apiComponent = process.env['API_COMPONENT'];

const jobComponent = JobComponentFactory.build();
const candidateComponent = CandidateComponentFactory.build();
let applicationComponent;
if (apiComponent === 'job' || !apiComponent) jobComponent.controller.subscribe(app);
if (apiComponent === 'candidate' || !apiComponent) candidateComponent.controller.subscribe(app);
if (apiComponent === 'application') {
  applicationComponent = ApplicationComponentFactory.build();
  applicationComponent.controller.subscribe(app);
}
if (!apiComponent) {
  applicationComponent = ApplicationComponentFactory.build(jobComponent.manager, candidateComponent.manager);
  applicationComponent.controller.subscribe(app);
}


app.listen(process.env['API_PORT']);
