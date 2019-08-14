import express = require('express');
import JobComponentFactory from './components/job/job-component-factory';
import CandidateComponentFactory from './components/candidate/candidate-component-factory';
import ApplicationComponentFactory from './components/application/application-component-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const jobComponent = JobComponentFactory.build();
jobComponent.controller.subscribe(app);

const candidateComponent = CandidateComponentFactory.build();
candidateComponent.controller.subscribe(app);

const applicationComponent = ApplicationComponentFactory.build(jobComponent.manager, candidateComponent.manager);
applicationComponent.controller.subscribe(app);

app.listen(2525);
