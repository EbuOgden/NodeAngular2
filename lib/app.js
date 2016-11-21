'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _main = require('./controllers/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/* Application Settings */

app.set('port', process.env.PORT || 3000); // Set Port
app.set('views', _path2.default.join(__dirname, '../views')); // Set Views File
app.set('view engine', 'jade'); // View Engine
app.use(_express2.default.static(_path2.default.join(__dirname, '../public'))); // Static files
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _methodOverride2.default)());

/*          */

app.get('/', _main2.default.getIndex);
app.get('/templates/:template', _main2.default.getTemplate);
app.get('/todos', _main2.default.getAllTodos);

app.post('/todos', _main2.default.insertNewTodo);

app.delete('/todos/:id', _main2.default.deleteTodo);

/* Starting App */
app.listen(app.get('port'), function () {
  console.log("App listening on " + app.get('port'));
});

/*          */