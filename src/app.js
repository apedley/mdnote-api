import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import categoriesRoutes from './routes/categories';
import notesRoutes from './routes/notes';
import knex from '../db/knex';
import { Model } from 'objection';
import config from '../config';
import cors from 'cors';

Model.knex(knex);

const app = express();
app.disable('x-powered-by');


app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/', routes);
app.use('/categories', categoriesRoutes);
app.use('/notes', notesRoutes);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      error: err,
      message: err.message
    });
});

export default app;
