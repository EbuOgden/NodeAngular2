import mongoose from 'mongoose';

import Todo from '../models/Todo';

const url = "mongodb://localhost:27017/todoDB";

let mainController = {
  getIndex : (req, res) => {
    res.render('index');
  },

  getTemplate: (req, res) => {
    res.render('templates/' + req.params.template);
  },

  getAllTodos: (req, res) => {
    mongoose.connect(url, (err) => {
      if(err){
        throw err;
      }

      const MongooseConnect = mongoose.connection;

      Todo.find({}, (err, todos) => {
        if(err){
          return res.send(err);
        }

        res.json(todos);

        MongooseConnect.close();
      });
    });


  },

  insertNewTodo: (req, res) => {
    mongoose.connect(url, (err) => {
      if(err){
        throw err;
      }

      const MongooseConnect = mongoose.connection;

      Todo.create({
        text : req.body.text,
        done : false
      }, (err, todo) => {
        if(err){
          return res.send(err);
        }

        Todo.find({}, (err, todos) => {
          if(err){
            return res.send(err);
          }
          res.json(todos);

          MongooseConnect.close();
        });
      });
    });
  },
  deleteTodo: (req, res) => {
    mongoose.connect(url, (err) => {
      if(err){
        throw err;
      }

      const MongooseConnect = mongoose.connection;

      Todo.remove({
        _id : req.params.id
      }, (err, todo) => {
        if(err){
          return res.send(err);
        }
        Todo.find({}, (err, todos) => {
          if(err){
            return res.send(err);
          }

          res.json(todos);

          MongooseConnect.close();
        });
      });
    });

  }
}

export default mainController;
