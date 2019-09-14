require('dotenv').config();

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash");
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    //these are for storing "sessions" in the database so you don't always have to log in and stuff
    session = require("express-session"),
    MongoStore = require("connect-mongo")(session);

//require route files
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes          = require("./routes/index")

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://CiaranAdmin:kGmAChKDGQRKAyIf@cluster0-eayph.azure.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//load test data for starting testing
//seedDB();

//moment - for dates and time etc
app.locals.moment = require("moment");

//passport configuration
app.use(session({
    secret: "Pam is cool",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 } // 180 minutes session expiration
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for passing through current user to all templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//putting in the "/name" means we don't have to include "/name" in the routes file
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//need this so you actually see the fucking site
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
 });