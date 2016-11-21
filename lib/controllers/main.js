'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Todo = require('../models/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "mongodb://localhost:27017/todoDB";

var mainController = {
  getIndex: function getIndex(req, res) {
    res.render('index');
  },

  getTemplate: function getTemplate(req, res) {
    res.render('templates/' + req.params.template);
  },

  getAllTodos: function getAllTodos(req, res) {
    _mongoose2.default.connect(url, function (err) {
      if (err) {
        throw err;
      }

      var MongooseConnect = _mongoose2.default.connection;

      _Todo2.default.find({}, function (err, todos) {
        if (err) {
          return res.send(err);
        }

        res.json(todos);

        MongooseConnect.close();
      });
    });
  },

  insertNewTodo: function insertNewTodo(req, res) {
    _mongoose2.default.connect(url, function (err) {
      if (err) {
        throw err;
      }

      var MongooseConnect = _mongoose2.default.connection;

      _Todo2.default.create({
        text: req.body.text,
        done: false
      }, function (err, todo) {
        if (err) {
          return res.send(err);
        }

        _Todo2.default.find({}, function (err, todos) {
          if (err) {
            return res.send(err);
          }
          res.json(todos);

          MongooseConnect.close();
        });
      });
    });
  },
  deleteTodo: function deleteTodo(req, res) {
    _mongoose2.default.connect(url, function (err) {
      if (err) {
        throw err;
      }

      var MongooseConnect = _mongoose2.default.connection;

      _Todo2.default.remove({
        _id: req.params.id
      }, function (err, todo) {
        if (err) {
          return res.send(err);
        }
        _Todo2.default.find({}, function (err, todos) {
          if (err) {
            return res.send(err);
          }

          res.json(todos);

          MongooseConnect.close();
        });
      });
    });
  }
};

exports.default = mainController;