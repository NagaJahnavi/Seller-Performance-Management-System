const express = require("express");
const bodyparser = require("body-parser");
const connectdb = require("./config/db");

const app = express();

connectdb();

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/api/perorder", require("./routes/api/perorder"));
app.use("/api/perday", require("./routes/api/perday"));
app.use("/api/healthstatus", require("./routes/api/healthstatus"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
