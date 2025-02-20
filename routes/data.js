var express = require('express');
var router = express.Router();
var client = require('../db'); // Import the database client

// Handle GET request
router.get('/', function(req, res, next) {
  client.query('SELECT * FROM public.usertable order by id', (err, result) => {
        if (err) {
          return next(err);
        }
        res.render('data', {data: result.rows});
  });
});

router.get('/id=:num', function(req, res, next) {
  num = Number(req.params.num);
  const query = 'SELECT * FROM public.usertable where id = $1;';
  client.query(query,[num], (err, result) => {
    if (err) {
        return next(err);
    }
    res.render('data', {data: result.rows});
  });
});

// Handle get request for id between 10 and 20
router.get('/10&20', function(req, res, next) {
  client.query('SELECT * FROM public.usertable where id BETWEEN 10 AND 20;', (err, result) => {
    if (err) {
        return next(err);
    }
    res.render('data', {data: result.rows});
  });
});

// handle GET request with parameters ida and idb
router.get('/:ida&:idb', function(req, res, next) {
  ida = Number(req.params.ida);
  idb = Number(req.params.idb);
  const query = 'SELECT * FROM public.usertable where id BETWEEN $1 AND $2;';
  client.query(query,[ida, idb], (err, result) => {
    if (err) {
        return next(err);
    }
    res.render('data', {data: result.rows});
  });
});

router.get('/test', function(req, res, next) {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page if not provided
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM public.usertable ORDER BY id LIMIT $1 OFFSET $2;';
  client.query(query, [limit, offset], (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('data', { data: result.rows, page, limit });
  });
});


//handle get request with string parameters for firstname that starts with character x or conatin x 
router.get('/:x', function(req, res, next) {
  const x = `%${req.params.x}%`;
  const query = 'SELECT * FROM public.usertable WHERE firstname LIKE $1;';
  client.query(query,[x], (err, result) => {
    if (err) {
        return next(err);
    }
    res.render('data', {data: result.rows});
  });
});



//post request to insert data into the database
router.post('/data', function(req, res, next) {
  const {id,firstname,lastname,email} = req.body;
  client.query('INSERT INTO public.usertable (id, firstname, lastname, email) VALUES ($1, $2, $3, $4)', [id, firstname, lastname, email], (err, result) => {
    if (err) {
      return next(err);
    }
    res.redirect('/database');
  });
});

//put request to update data in the database
router.put('/data', function(req, res, next) {
  const {id,firstname,lastname,email} = req.body;
  client.query('UPDATE public.usertable SET firstname = $2, lastname = $3, email = $4 WHERE id = $1', [id, firstname, lastname, email], (err, result) => {
    if (err) {
      return next(err);
    }
    res.redirect('/database');
  });
});

//delete request to delete data from the database
router.delete('/data', function(req, res, next) {
  const {id} = req.body;
  //what if id provided is already deleted or not present in the database ??
  if (!id) {
    return next(new Error('No ID provided'));
  }
  client.query('DELETE FROM public.usertable WHERE id = $1', [id], (err, result) => {
    if (err) {
      return next(err);
    }
    res.redirect('/database');
    res.send('Data deleted successfully');
  });
});
module.exports = router;