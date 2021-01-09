var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'join_us'
});

app.get("/", function(req,res) {
	//find count of users in DB
	var q = 'SELECT COUNT(*) AS total FROM users'
	//Respond with that count
	connection.query(q, function(err, result) {
		if(err) throw err;
		var total = result[0].total;
		// res.send("We have " + total + " users in our db");
		res.render('home', {data: total});
	});
	
});

app.post("/register", function(req, res) {
	// console.log("POST REQUEST SENT TO /REGISTER");
	// console.log("Email : " + req.body.email);
	var person = { 
		email: req.body.email 
	}; // preparing data to be inserted
	var q = 'INSERT INTO users SET ?';
	// as same as
	// var q = "INSERT INTO users (email) VALUES (" + req.body.email + ")";
	connection.query(q, person, function(err, result) {
		if(err) throw err;
		res.redirect("/"); //take back to home page.
	});
	
});

app.get("/joke", function(req,res) {
	var joke = "what do you call a dog.....";
	console.log("REQUSTED THE JOKE ROUTE");
	
	// res.send(joke);
	var pink = 'pink';
	
	res.render('example', {color: pink});
	
});
 


app.get("/random_num", function(req,res) {
	var num = Math.floor(Math.random()*10)+1;
	res.send("Your lucky number is " + num);
});

app.listen(3000, function(){
	console.log("Server running on 3000!");
});
// app.listen(3000);