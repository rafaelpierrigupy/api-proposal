import express = require('express');
import ApplicationComponentFactory from './components/application/application-component-factory';

const app = express();
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello world'));

const applicationComponent = ApplicationComponentFactory.build();
applicationComponent.controller.subscribe(app);

app.listen(2525);
