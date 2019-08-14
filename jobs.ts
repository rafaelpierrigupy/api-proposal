import express = require('express');
import JobComponentFactory from './components/job/job-component-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const jobComponent = JobComponentFactory.build();
jobComponent.controller.subscribe(app);

app.listen(2527);
