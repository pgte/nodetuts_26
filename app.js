var express   = require('express'),
    everyauth = require('everyauth'),
    util      = require('util'),
    users     = require('./lib/users');

everyauth.twitter
  .consumerKey('OExJ9lyDkQlaedNVB6QQ')
  .consumerSecret('qDOXx67ArhbiA6fYeGOuxgbMYyph0hiJmMfEDtosc')
  .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData) {
    var promise = this.Promise();
    users.findOrCreateByTwitterData(twitterUserData, accessToken, accessTokenSecret, promise);
    return promise;
  })
  .redirectPath('/');

var app = express.createServer();
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
  everyauth.helpExpress(app);
});


app.get('/', function(req, res) {
  res.render('home');
});

app.listen(4000);