const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const BUILD_ID = process.env.BUILD_ID || "local";
const ENV = process.env.NODE_ENV || "development";

app.get("/", (req, res) => {
  res.send(`
    <h1>Automated CI/CD Pipeline <3</h1>
    <p><b>GitHub → Jenkins → AWS EC2</b></p>
    <hr />
    <p><b>Environment:</b> ${ENV}</p>
    <p><b>Build ID:</b> ${BUILD_ID}</p>
    <p><b>Status:</b> Deployment Successful</p>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
