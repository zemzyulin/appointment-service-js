import express from 'express';
var router = express.Router();

// main index route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Appointment Service' });
});

export default router;
