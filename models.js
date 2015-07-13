var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//var autoIncrement = require('mongoose-auto-increment');
/**
 * Models.
 *
 * This is how we create, edit, delete, and retrieve user accounts via MongoDB.
 */
module.exports.User = mongoose.model('user', new Schema({
  uuid         :    ObjectId,
  email      :    { type: String, required: true , unique: true },
  password   :    { type: String, required: true },
  usertype   :    {type: Boolean,required:true },
  data       :     Object,
}));


//--------------------Volunteer Collection Model------------------------------
module.exports.Volunteer = mongoose.model('Volunteer', new Schema({
  id            :     ObjectId,
  volunteer_id  :     {type: Schema.Types.ObjectId, ref: 'User'},
  first_name    :  		{ type: String, required: true },
  last_name     :  		{ type: String, required: true },
  dob           :			{ type: Date },
  contact       :			{ type: Number, required: true },  
  gender        :			{ type: String, required: true },
  address       :			{ type: String, required: true },
  location      :			{ type: String, required: true },
  date_created  :			{ type: Date },
  date_updated  :			{ type: Date, default: Date.now }, //update whenever the ngo.save() function is called.
  resume        :			{ type: Boolean, required: true, default:0 },
  voided        :			{ type: Boolean, required: true, default:0 }, 
}));

//--------------------Volunteer Qualification Model------------------------------
module.exports.V_Qualification = mongoose.model('V_Qualification', new Schema({
  id                 :     ObjectId,
  //Voluteer_id      :     auto incrementing variable needed. (Unique)
  voluteer_id        :     {type: Schema.Types.ObjectId, ref: 'Volunteer'},
  senior_secondary   :     { type: String},
  higher_secondary   :     { type: String},
  undergraduate      :     { type: String},
  postgraduate       :     { type: String}
}));

//--------------------Connection Model------------------------------
module.exports.Connection = mongoose.model('Connection', new Schema({
  id               :    ObjectId,
  //Voluteer_id    :    auto incrementing variable needed. (Unique)
  voluteer_id      :    {type: Schema.Types.ObjectId, ref: 'Volunteer'},
  opportunity_id   :    {type: Schema.Types.ObjectId, ref: 'NGO_Opportunity'},
  validation       :    { type: Boolean, required: true, default:0 }
}));

//--------------------NGO Collection Model------------------------------
module.exports.NGO = mongoose.model('NGO', new Schema({
  id                  :     ObjectId,
  ngo_id              :     {type: Schema.Types.ObjectId, ref: 'User'},
  //Ngo_id            :     auto incrementing variable needed. (Unique)
  name                :			{ type: String, required: true },
  location            :			{ type: String, required: true },
  date_created        :			{ type: Date },
  date_updated        :			{ type: Date, default: Date.now },
  //update whenever the ngo.save() function is called.
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
  registration_status : 		{ type: Boolean, required: true },
  description         :  		{ type: String, required: true },
  contact             :			{ type: Number, required: true },
  contact_person      :  		{ type: String, required: true },
  website             :			{ type: String},
  voided              :			{ type: Boolean, required: true, default:0 },
}));

//NGO.plugin(autoIncrement.plugin, { model: 'NGO', field: 'ID' });

//--------------------Opportunity Collection Model------------------------------
module.exports.NGO_Opportunity = mongoose.model('NGO_Opportunity', new Schema({
  id                :     ObjectId,
 //Ngo_id           :     auto incrementing variable needed. (Unique)
  Ngo_id            :     {type: Schema.Types.ObjectId, ref: 'NGO'},
  name              : 	  { type: String, required: true },
  description       : 	  { type: String, required: true },
  // opportunity_type  : 	   { type: String,required:true},
  // cause             :     { type: [Number]},
  // location          :     { type: String, required: true }, //cause array, containing id & string  
  // required_skills   :     { type: String, required: true },
  // date_start        : 		 { type: Date },
  // date_end          : 		 { type: Date },
  // compensation      :     { type: String, required: true },
  // date_created      : 		 { type: Date },
  date_updated         : 		 { type: Date, default: Date.now }, //update whenever the ngo.save() function is called.
  voided               :     { type: Boolean, required: true, default:0 },
}));

//--------------------Ngo location Collection Model------------------------------
module.exports.NGO_Location = mongoose.model('NGO_Location', new Schema({
  id               :      ObjectId,
  Ngo_id           :      {type: Schema.Types.ObjectId, ref: 'NGO'},
  address1         :      { type: String, required: true },
  address2         :      { type: String},
  city             :      { type: String, required: true},
  state            :      { type: String, required: true},
  country          :      { type: String, required: true},
  title            :      { type: String, required: true},
  validation       :      { type: Boolean, required: true, default:0 },
  date_created     :      { type: Date },
  pincode          :      { type: Number, required: true,},
  voided           :      { type: Boolean, required: true, default:0 },
}));

//--------------------Cause Collection Model------------------------------
module.exports.Cause = mongoose.model('Cause', new Schema({
  id                     :      ObjectId,
  //Ngo_id               :      auto incrementing variable needed. (Unique)
  Ngo_id                 :      {type: Schema.Types.ObjectId, ref: 'NGO'},
  cause_name             :      { type: String, required: true },
  description            :      { type: String, required: true },
  date_created           :      { type: Date },
  verification_created   :      { type: Date },
  creator_name           :      { type: String, required: true }
}));

