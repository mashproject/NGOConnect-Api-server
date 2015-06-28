var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  username      :    { type: String, required: true , unique: true },
  password      :    { type: String, required: true , unique: true},
  salt          :    { type: String, required: true , unique: true },
  date_created  : Date,  
  voided       :     { type: Boolean, default: false},
  is_person    : 	 { type: Boolean, default: true},
  person				:	[{ type: Schema.ObjectId, ref: 'person' }]
});

userSchema.pre('save', function(next) {
	  var salt = bcrypt.genSaltSync(10);
	  this.salt=salt;
	  var hash = bcrypt.hashSync(this.password, salt);
	  this.password=hash;
	  // get the current date
	  var currentDate = new Date();
	  // if date_created doesn't exist, add to that field
	  if (!this.date_created)
	    this.date_created = currentDate;
	  next();
});

module.exports.User = mongoose.model('user', userSchema);

