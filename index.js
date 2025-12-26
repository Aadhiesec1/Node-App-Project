const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Automatic CI/CD Pipeline Deploy with <b>Github & Jenkins</b> <3");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
