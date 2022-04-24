var express = require('express');
var router = express.Router();


var mongoDb = require("mongodb");
var mongoClient = mongoDb.MongoClient;
var url = 'mongodb://localhost:27017';

/* GET home page. */
router.post('/', (req, res, next) => {
    console.log(req.body);
    var responseData = {};
    mongoClient.connect(url, (error, client) => {
      if (error) {
          responseData.msg = 'Error whiel connecting to  db server';
      } else {
        var db = client.db("OnlineShoppingApp");
        var collection = db.collection("userAccountDetails");
        //console.log(collection.find())

        collection.find({userId : req.body.userId,userPwd : req.body.userPwd}).toArray((error,data) => { 
        console.log(error);
        console.log(data);
        //console.log(req.body.userId) //userid
        if (data.length == 0) {
          responseData.status = 'Invalid';
          //console.log(responseData.status)  //status as invalid
        }else{
          responseData.status = 'Valid'
        } 
      client.close();  
      res.send(JSON.stringify(responseData)); 
      });
    };
  });
});
   

module.exports = router;
