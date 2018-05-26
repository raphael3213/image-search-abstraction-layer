// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bing = require('node-bing-api')({ accKey: "a98ec60e062a41c3a88313e97e93caea" });
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
      
      if(err) console.log(err);
      console.log("logged");
      client.close()
                });
});
  var soff=1;
  if(off)
  {
    if(off==1)
    {
      off=0
      soff=1
    }
    else if(off>1){
    soff=off+1;
    }
    off=1*off;
  }
  bing.images(search, {
  count: 10*soff,   
  offset: Math.random()
  }, function(error, rez, body){
    
    if(error) console.log(error);
    var disp=[];
    console.log(body);
    console.log("yo");
    for(var i=0;i<10;i++)
    {
      disp.push({"URL":body.value[i].webSearchUrl,"Name":body.value[i].name,"thumbnail":body.value[i].thumbnailUrl,"context":body.value[i].hostPageDisplayUrl});
      //disp.push("/n");
    }
    res.json(disp);
    
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
