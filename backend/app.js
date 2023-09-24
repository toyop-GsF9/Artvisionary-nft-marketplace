const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(express.json()); 
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); 
}

app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/users", userRouter); 

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); 
});

app.use(globalErrorHandler);

module.exports = app;