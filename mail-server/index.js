const app = require("./app");

const port = 3001;

app.listen(port, function () {
  console.log(`Mail server listening on port ${port}!`);
});

// app.listen(port, () => console.log(`Mail server listening on port ${port}!`));
