var express = require('express');
var http = require('http');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
   res.sendFile(__dirname+"/public/homepage.html");
});

app.get("/sendmoney",(req,res)=>{
  res.redirect("/");
});

app.post("/sendmoney",(req,res)=>{
        var params = ['"'+req.body.walletadd+'"',0.1, '"donation"','"sean outpost"'];
        console.log(options("sendtoaddress",params));
	request(options("sendtoaddress",params),(err,response,body)=>{
        var data = JSON.parse(body);
	var txid = data.result;
	if(txid){
	var html = '<html><head><link rel="stylesheet" type="text/css" href="css/style.css"/></head><body><div class="header"><a class="logo">ParkChain</a></div><div class="body"><h1>Money send successfuly</h1><h2>'+txid+'</h2>  <a class="home" href="/"><span>&#x2190;</span>Back</a></div></body></html>';
	res.send(html);
	}
	else{
	   res.sendFile(__dirname+"/public/error.html");
	}
  });
});

var request = require('request');
var headers = {'content-type': 'text/plain;'};
var dataString = (method,params)=>{
	        return '{"jsonrpc": "1.0", "id":"curltest", "method":"'+method+'","params":['+params+']}';
};


var options = (m,params)=>{
	return {
		    url: 'http://127.0.0.1:9965/',
		    method: 'POST',
		    headers: headers,
		    body: dataString(m,params),
		    auth: {
			            'user': 'user2755661282',
			            'pass': 'passa8c711668b2033bff66d98157c314d00d329b8ea483af3efeea1c2e9980aa364d3'
			        }
		 }
};

app.listen(3001,()=>{
   console.log("App running on 3001");
});
