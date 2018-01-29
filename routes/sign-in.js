const express = require('express');
const router = express.Router();
const passport = require('passport');

const { Client } = require('pg');

const client = new Client({
  connectionString : "pg://nhwljdkwkfhnoy:7a2f32711c734a5d67cfc0a1e59acc91654193795d8655de7ae0cfb27b630390@ec2-174-129-22-84.compute-1.amazonaws.com:5432/dfh46ttrtrflgb",
  ssl: true,
});
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

router.get('/', (req, res) => {
    res.render('sign-in');
});

router.post('/', function(req, res,next) {
	console.log(req.body);
	console.log("hello");
	client.query('SELECT * FROM employee;', (err, res,body) => {
  if (err) throw err;
  //for (let row of res.rows) {
    //console.log(JSON.stringify(row));
    var context = {};
    var results=[]; 
    var jsonResult = JSON.parse(body);
    for(var entry in jsonResult.Data){
			results.push({
				
				employee_id: jsonResult.Data[entry].id,
				employee_email: jsonResult.Data[entry].email,
				employee_password: jsonResult.Data[entry].password,
				access_date: jsonResult.Data[entry].date,
				signature: jsonResult.Data[entry].signature,
				employee_type: jsonResult.Data[entry].type,
				admin_id: jsonResult.Data[entry].admin_id,
				employee_first_name: jsonResult.Data[entry].first_name,	
				employee_last_name	: jsonResult.Data[entry].last_name	
						
				}
			);
		if(results.email === username && results.password === password){
    		console.log("success")
    		res.render('/dashboard');
   		 }
		}
    
  
 // client.end();
});
    //res.render('/dashboard');
});

/*
router.post('/', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});
*/
module.exports = router;
