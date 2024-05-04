import express from 'express';
import morgan from 'morgan';
import { envConfig } from 'src/config';
import { dbConnect } from 'src/database';
import { router } from 'src/routes';

const PORT = envConfig.PORT || 3000;

const app = express();

app.set('port', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(router);

dbConnect();

export default app;
