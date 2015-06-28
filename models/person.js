var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  given_name      :    { type: String, required: true  },
  family_name	  :    { type: String, required: true  },
  birthdate      :  Date,
  address          :   String,
  contact  : String,
  email       :     { type: String, required: true , unique: true },
  voided       :     { type: Boolean, default: false},
  user 			: [{ type: Schema.ObjectId, ref: 'user' }],
  date_updated	: Date,
  gender		: String
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

personSchema.methods.validateContactNumber = function() {
  var phonePattern=/^[0-9]+$/;  
  return this.contact.match(phonePattern);  
};

personSchema.methods.validateEmail = function() {
  var emailPattern=/[^@]+\@[^@]+\.[^@]+/;
  return this.email.match(emailPattern);
};

//function to return full name for given parameter identifying the person
// personSchema.methods.getName = function() {
// };

module.exports.Person = mongoose.model('person', personSchema);