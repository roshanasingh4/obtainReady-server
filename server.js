//All imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db");
const fileUpload = require("express-fileupload");
const passport = require("passport");

connectToMongo();

require("dotenv").config();
const app = express();

app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/', require('./callback'))

//All routes
app.use("/auth/facebook", require("./routes/facebookRoute"));
app.use("/auth/google", require("./routes/googleRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/api", require("./routes/uploadRoute"));
app.use("/api/auth", require("./routes/auth1"));

//All routes
app.use("/api/auth", require("./routes/registerRoute"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
