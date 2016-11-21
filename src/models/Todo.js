import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let todoSchema = new Schema({
  text : {
    type : String
  },

  done : {
    type : Boolean
  }
});

export default mongoose.model('Todo', todoSchema);
