var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	user_id:{type:String},
	city:{type:String},
	propertylocation:{type:String},
	propertyzipcode:{type:String},
	category:{type:String},
	housingtype:{type:String},
	postingtitle:{type:String},
	discription:{type:String},
	startdate:{type:String},
	starttime:{type:String},
	enddate:{type:String},
	endtime:{type:String},
	rent:{type:String},
	pricemode:{type:String},
	accomodates:{type:String},
	furnished:{type:String},
		

})