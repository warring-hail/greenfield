// var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var helpers = require('./helpers'); // our custom middleware

module.exports = function(app, express) {

  var userRouter = express.Router();
  var charityRouter = express.Router();
  var smsRouter = express.Router();
  var scraperRouter = express.Router();

  // app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/sms', smsRouter); // use sms router for all sms requests
  app.use('/api/users', userRouter); // use user router for all user requests
  app.use('/api/charity', charityRouter); // user charity router for charity requests
  app.use('/scraper', scraperRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../users/userRoutes')(userRouter);
  require('../sms/smsRoutes')(smsRouter);
  require('../charity/charityRoutes')(charityRouter);
  require('../scraper/scraperRoutes')(scraperRouter);
};
