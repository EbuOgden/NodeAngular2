import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';

import mainController from './controllers/main';

let app = express();

/* Application Settings */

app.set('port', process.env.PORT || 3000); // Set Port
app.set('views', path.join(__dirname, '../views')); // Set Views File
app.set('view engine', 'jade'); // View Engine
app.use(express.static(path.join(__dirname, '../public'))); // Static files
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(methodOverride());

/*          */

app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/todos', mainController.getAllTodos);

app.post('/todos', mainController.insertNewTodo);

app.delete('/todos/:id', mainController.deleteTodo);


/* Starting App */
app.listen(app.get('port'), function() {
  console.log("App listening on " + app.get('port'));
});

/*          */
