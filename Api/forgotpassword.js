var mongoose = require('mongoose'),
    express = require('express'),
    user = mongoose.model('User')



// DB models
require('../models/User');

app.get('/api/resetpassword',function(req,res){
  var Email = req.query.email;
  console.log('========='+Email);
  res.send({message:'email recieved'});
})
