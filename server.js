// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bing = require('node-bing-api')({ accKey: "6fc8cfa19f0b4218b8e57db73c058442" });
var mongo=require('mongodb').MongoClient
var url=process.env.MONGOLAB_URI;





app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/imager/:img*",function(req,res,next)
        {
  var search=req.params.img;
  var off=req.query;
  mongo.connect(url,function(err,client)
                {
    var db1=client.db('hist');
    var coll=db1.collection('mainer');
    
    coll.insert({
      "searchTerm":search,
      "date":new Date()
    },function(err,data){
      console.log("logged");
      client.close()
                });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
