const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();
server.use(middleware);
server.use("", router);
server.listen(8080, () => {
  console.log("listening on http://localhost:8080/dogs");
});
// // { "username": "nayan", "task": "reatc" },
// { "username": "nayan", "task": "study" },
// { "username": "nayan", "task": "novel" },
// { "username": "kumar", "task": "reatc" },
// { "username": "ajay", "task": "study" },
// { "username": "raju", "task": "novel" }
