const app = require("./db/app");

app.listen(9090, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server is listening on port 9090");
});
