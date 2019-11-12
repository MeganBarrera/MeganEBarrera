// require modules
var express = require("express"); // builds and handles web app/API
var bodyParser = require("body-parser"); // populates middlewares with objects from requests
var exphbs = require("express-handlebars"); // renders content into placeholders

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

// listening on port
app.listen(PORT, function() {// Start our server so that it can begin listening to client requests
    console.log("App listening!! on PORT " + PORT); // Log (server-side) when our server has started
});


