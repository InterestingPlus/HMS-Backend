const cron = require("cron");
const https = require("https");

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get("https://twiller-server.onrender.com", (res) => {
      if (res.statusCode === 200) console.log("GET Request sent Successfully!");
      else console.log("GET Request failed!", res.statusCode);
    })
    .on("error", (e) => console.error("Error while Sending request", e));
});

module.exports = job;
