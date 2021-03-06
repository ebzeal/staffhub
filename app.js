const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const app = express();

//load model module
require("./models/Staff");

//Passport config
require("./config/passport")(passport);

//load routes
const index = require("./routes/index");
const staff = require("./routes/staff");
const admin = require("./routes/admin");

//load keys
const keys = require("./config/keys.js");

//Handlebars helpers
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon,
  ifAdmin,
  ifApproved
} = require("./helpers/hbs");

//Map global promise
mongoose.Promise = global.Promise;
//connect mongoose
mongoose
  .connect(keys.mongoURI, {})
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch(err => {
    console.log(err);
  });

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method Override middleware
app.use(methodOverride("_method"));

//handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      truncate: truncate,
      stripTags: stripTags,
      formatDate: formatDate,
      select: select,
      editIcon: editIcon,
      ifAdmin: ifAdmin,
      ifApproved: ifApproved
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//middleware for express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//passport Middleware
// Tell express to use passport as auth middleware
app.use(passport.initialize());
// Inorder to persist login sessions - we need to tell passport to use session middleware
app.use(passport.session());

//Middleware for flash-connect
app.use(flash());

//Global Variables for flash messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.staff = req.staff || null;
  next();
});

//use routes
app.use("/", index);
app.use("/staff", staff);
app.use("/admin", admin);

const port = process.env.PORT || 3000;

//Bring in static files
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
