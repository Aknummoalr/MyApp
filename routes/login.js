var express = require('express');
var router = express.Router();
var client = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

router.post("/", function(req, res, next) {
    const { id, firstname, email } = req.body;
    console.log('Request body:', req.body);
    if (!id || !firstname || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const Numberid = Number(id);  //get the id and other data 
    const trimmedFirstname = firstname.trim();
    const trimmedEmail = email.trim(); 

    const query = `SELECT * FROM public.usertable WHERE "id" = $1 AND "firstname" ILIKE $2 AND "email" ILIKE $3;`; // Query to check
    client.query(query, [Numberid, trimmedFirstname, trimmedEmail], (err, result) => { 
        if (err) {
            console.error('Database query error:', );
            return next(err);
        }
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Login failed, Invalid credentials' });
        }
        if(result.rows.length > 0){
            const user = result.rows[0];
            const token = jwt.sign({ id: Numberid, firstname: trimmedFirstname, email: trimmedEmail, type: user.type }, secretkey, { expiresIn: '1h' },(err, token) => {
                if (err) {
                    return next(err);
                }
                res.json({ 
                    message: 'Login successful', 
                    token: token 
                });
        });
        } else {
            return res.status(401).json({ message: 'Login failed, Invalid credentials' });
        }
    });
});

module.exports = router;
