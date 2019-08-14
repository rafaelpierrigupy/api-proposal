import express = require('express');
import CandidateComponentFactory from './components/candidate/candidate-component-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const candidateComponent = CandidateComponentFactory.build();
candidateComponent.controller.subscribe(app);

app.listen(2526);
