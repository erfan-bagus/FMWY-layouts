const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    data={'test':'dsadsa','dsadsa':'dsadsadsa'};
   res.render('welcome',data);
  });

  module.exports=router;