const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("CI/CD Automatic Build Pipeline Working!");
});

app.listen(3000, '0.0.0.0');
