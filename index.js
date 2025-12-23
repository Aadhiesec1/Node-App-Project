const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Automated CI/CD Pipeline with <b>Github & Jenkins</b> <3");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
