var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);
  // mongoose.connect('mongodb://CEN3031:CEN3031TA@ds259732.mlab.com:59732/listingsbootcamp3');

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /**TODO
  Serve static files */
  app.use('/', express.static(__dirname + '/../../client'));


  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/listings/', listingsRouter);


  /**TODO
  Go to homepage for all routes not specified */
  app.all('/*', function(req, res){
    res.sendFile('../../client/index.html');
  });

  return app;
};
