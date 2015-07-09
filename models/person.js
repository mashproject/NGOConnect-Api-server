var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utils = require('../utils');

var personSchema = new Schema({
  given_name      :    { type: String, required: true  },
  family_name	    :    { type: String, required: true  },
  birthdate       :    Date,
  address         :    String,
  gender		  :    { type: String, required: true  },
  contact         :    { type: String, required: true  },
  email           :    { type: String, required: true , unique: true },
  voided          :    { type: Boolean, default: false},
  user_id 			  :    [{ type: Schema.ObjectId, ref: 'user' }],
  date_created    :    Date,
  date_updated	  :    Date
});

personSchema.pre('save', function(next) {

   this.date_updated = currentDate;
  // get the current date
  var currentDate = new Date();
  // if date_created doesn't exist, add to that field
  if (!this.date_created)
    this.date_created = currentDate;
  next();
});

//function to return full name for given parameter identifying the person
// personSchema.methods.getName = function() {
// };

module.exports.Person = mongoose.model('person', personSchema);
