var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utils = require('../utils');

var organisationSchema = new Schema({
  name          : String,
  location_id 			        :    [{ type: Schema.ObjectId, ref: 'location' }],
  orgaisation_type_id			  :    [{ type: Schema.ObjectId, ref: 'orgaisation_type' }],
  registration_status       :    String,
  description               :    String,
  contact_number            :    { type: String, required: true  },
  contact_person            :    { type: String, required: true  },
  website                   :    String,
  date_created              :    Date,
  date_updated	            :    Date,
  voided                    :   { type: Boolean, default: false}
});

organisationSchema.pre('save', function(next) {
	  // get the current date
	  var currentDate = new Date();
	  this.date_updated = currentDate;
    // if date_created doesn't exist, add to that field
	  if (!this.date_created)
	    this.date_created = currentDate;
	  next();
});
module.exports.Organisation = mongoose.model('organnisation', organisationSchema);
