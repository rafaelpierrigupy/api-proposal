import express = require('express');
import JobControllerFactory from './components/job/interfaces/http/job-controller-factory';
import CandidateControllerFactory from './components/candidate/interfaces/http/candidate-controller-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const jobController = JobControllerFactory.build();
jobController.subscribe(app);

const candidateController = CandidateControllerFactory.build();
candidateController.subscribe(app);

app.listen(2525);
