import express = require('express');
import JobControllerFactory from "./components/job/interfaces/http/job-controller-factory";

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const jobController = JobControllerFactory.build();
jobController.subscribe(app);

app.listen(2525);
