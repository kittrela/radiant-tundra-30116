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
    //console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    //console.log("hello");
	
    client.query('SELECT employee_email,employee_password, employee_type  FROM employee', (err, res,body) => {
        if (err) throw err;
        var context = {};
        var results=[];
        for (let row of res.rows) {
            var jsonResult = (JSON.stringify(row));
  	
   
            var context = {};
            var results=[];
            for (var i of jsonResult)
            {
                results.push({
				
                    employee_email: jsonResult.Data[i].employee_email,
                    employee_password: jsonResult.Data[i].employee_password,
                    employee_type: jsonResult.Data[i].employee_type,
			
						
                });
        //console.log(jsonResult);
            };
   	
            console.log("User Email: " + results.Data[0].employee_email); 
 

    	
    	
    		
        };
    });
});
   	
		
    	
  
// client.end();

//res.render('/dashboard');

/*
router.post('/', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});
*/
module.exports = router;
