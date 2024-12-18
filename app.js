const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const projectsRouter = require("./routes/projects");

const communityRouter = require("./routes/communityRouter");
const commentRouter = require("./routes/commentRouter");
const { connect } = require("mongoose");

const { config } = require("dotenv");
const cors = require("cors");

const app = express();

const origin = ["http://localhost:3000"]
app.use(cors({
  origin: origin,
  credentials: true
}));

config({ path: ".env.development" });
const { DB_URI, DB_NAME } = process.env;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static("uploads"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/projects", projectsRouter);

app.use("/api/community", communityRouter);
app.use("/api/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

connect(DB_URI, { dbName: DB_NAME }).then((r) => {
  console.log(`successfully connect mongo db. DB_NAME=${DB_NAME}`);
});

app.listen(8080, () => {
  console.log(`app is listening on port 8080`);
});
