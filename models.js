var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Our User model.
 *
 * This is how we create, edit, delete, and retrieve user accounts via MongoDB.
 */
module.exports.User = mongoose.model('User', new Schema({
  id:           ObjectId,
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  email:        { type: String, required: true , unique: true },
  password:     { type: String, required: true },
  data:         Object,
}));


//--------------------NGO Collection Model------------------------------
module.exports.NGO = mongoose.model('NGO', new Schema({
  id:           ObjectId,
  //Ngo_id   = auto incrementing variable needed. (Unique)
  name: 	    			{ type: String, required: true },
  location:    				{ type: String, required: true },
  date_created: 			{ type: Date },
  date_updated: 			{ type: Date, default: Date.now }, //update whenever the ngo.save() function is called.


  /*Example of updating the "date_created" & "date_update" fields

  var ItemSchema = new Schema({
    name    : { type: String, required: true, trim: true }
  , created_at    : { type: Date }
  , updated_at    : { type: Date }
	});


	ItemSchema.pre('save', function(next){
	  now = new Date();
	  this.updated_at = now;
	  if ( !this.created_at ) {
	    this.created_at = now;
	  }
	  next();
	});

	*/



  registration_status: 		{ type: String, required: true },
  description:        		{ type: String, required: true },
  contact:    				{ type: Number, required: true },
  contact_person:			{ type: String, required: true },
  website:    				{ type: String},
  voided:    				{ type: Boolean, required: true },

  
}));