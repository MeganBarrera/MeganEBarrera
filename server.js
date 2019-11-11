require('dotenv').config();

// require modules
var express = require("express"); // builds and handles web app/API
var bodyParser = require("body-parser"); // populates middlewares with objects from requests
var exphbs = require("express-handlebars"); // renders content into placeholders
var keystone = require("keystone");

// Define a port to listen for incoming requests
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data types parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// static directory - public assets
app.use(express.static("public"));

// ROUTER The below points our server to a series of "route" files.
require("./routes/html-routes.js")(app);

// setting handlebar defaults - main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting handlebar body - home.handlebars
app.get("/", function (_req, res) {
    res.render("home");
});
// app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));

keystone.init({
    'name': 'MeganEBarrera',
    'brand': 'MeganEBarrera',
    'favicon': 'public/favicon.ico',
    // 'frame guard': 'deny',
    'views': 'templates/views',
    'view engine': '.hbs',
    'static': 'public',
    // 'wysiwyg images': true,

    'custom engine': exphbs.create({
		layoutsDir: 'templates/views/layouts',
        partialsDir: 'templates/views/partials',
        defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
    }).engine,
    
    'auto update': true,
    'mongo': process.env.MONGO_URI,
    'model prefix': 'mongo',
	'session': true,
	'auth': true,
    'user model': 'User',
    'session store options': 'connect-mongostore',
});

keystone.get({
    "sessionStore": {
        "db": {
            "name": process.env.MONGO_URI,
            "servers": [
            { "host": "127.0.0.1", "port": 27017 }
            ]
        }
        }
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server
// keystone.start();
// keystone.app = app;
// keystone.start();

// listening on port
app.listen(PORT, function() {// Start our server so that it can begin listening to client requests
    console.log("App listening!! on PORT " + PORT); // Log (server-side) when our server has started
});
keystone.app = app;
keystone.start();

