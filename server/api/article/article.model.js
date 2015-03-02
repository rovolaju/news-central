'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

ArticleSchema.statics = {
  loadRecent: function(req, cb) {
  if(req){
	this.find(req)
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
  else{
    this.find({})
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
	}
  }
};

module.exports = mongoose.model('Article', ArticleSchema);