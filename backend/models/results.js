const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PASS', 'FAIL'],
    required: true
  }
}, { timestamps: true });

resultSchema.pre('save',(function(next){
  this.status=this.score >=50 ? 'PASS' : 'FAIL';
  next ();
}))

module.exports = mongoose.model('Result', resultSchema);
