var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  cors = require('cors'),
  path = require('path'),
  logger = require('morgan'),
  config = require('./config');

var app = express();

app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(logger('dev'));
app.use(cors());
app.use(require('less-middleware')(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/signed', routes.signed);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
