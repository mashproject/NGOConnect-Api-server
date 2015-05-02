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
  email:        { type: String, required: true , unique: true },
  password:     { type: String, required: true },
  data:         Object,
}));


//--------------------Volunteer Collection Model------------------------------
module.exports.Volunteer = mongoose.model('Volunteer', new Schema({
  id:           ObjectId,
  //Ngo_id   = auto incrementing variable needed. (Unique)
  first_name: 	    		{ type: String, required: true },
  last_name: 	    		{ type: String, required: true },
  dob: 						{ type: Date },
  contact:    				{ type: Number, required: true },  
  gender: 	    			{ type: String, required: true },
  address:    				{ type: String, required: true },
  location:    				{ type: String, required: true },
  date_created: 			{ type: Date },
  date_updated: 			{ type: Date, default: Date.now }, //update whenever the ngo.save() function is called.
  resume:    				{ type: Boolean, required: true, default:0 },
  voided:    				{ type: Boolean, required: true, default:0 },

  
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


  registration_status: 		{ type: Boolean, required: true },
  description:        		{ type: String, required: true },
  contact:    				{ type: Number, required: true },
  contact_person:			{ type: String, required: true },
  website:    				{ type: String},
  voided:    				{ type: Boolean, required: true, default:0 },

  
}));





//--------------------Opportunity Collection Model------------------------------
module.exports.NGO_Opportunity = mongoose.model('NGO_Opportunity', new Schema({
  id:           			ObjectId,
  //Ngo_id   = auto incrementing variable needed. (Unique)
  name: 	    			{ type: String, required: true },
  description: 	    		{ type: String, required: true },
  opportunity_type: 		{ type: Date },
  cause:    				{ type: [Number]},
  location:    				{ type: String, required: true }, //cause array, containing id & string  
  required_skills:    		{ type: String, required: true },
  date_start: 			    { type: Date },
  date_end: 			    { type: Date },
  compensation:    			{ type: String, required: true },
  date_created: 			{ type: Date },
  date_updated: 			{ type: Date, default: Date.now }, //update whenever the ngo.save() function is called.
  voided:    				{ type: Boolean, required: true, default:0 },

  
}));