var express = require('express');
var router = express.Router();
var client = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

router.post("/", function(req, res, next) {
    const { id, username, email } = req.body;
    const Numberid = Number(id);  //get the id and other data 

    const query = `SELECT * FROM public.usertable WHERE id = $1 AND firstname = $2 AND email = $3`; // Query to check
    client.query(query, [Numberid, username, email], (err, result) => { 
        if (err) {
            return next(err);
        }
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Login failed, Invalid credentials' });
        }
        if(result.rows.length > 0){
            const user = result.rows[0];
            const token = jwt.sign({ id: Numberid, username: username, email: email }, secretkey, { expiresIn: '300s' },(err, token) => {
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
