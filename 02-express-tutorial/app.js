const express = require("express");
const app = express();
const people = require("./routes/people");
const auth = require("./routes/auth");

//static assets
app.use(express.static("./methods-public"));
//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

app.use("/api/people",people)
app.use("/login",auth)

app.listen(5000, () => {
  console.log("Server is running on port 5000...." );
});



// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const logger = require("./Logger");
// const authorize = require("./authorize");

// // req => middleware => res
// // app.use([ logger, authorize]);//order matters
// //api/home/about/products/items
// // app.use(express.static('./public'))

// app.use(morgan('tiny'));
// app.get('/',(req, res) => {
//   res.send("Home Page");
// })

// app.get('/about', (req, res) => {
//   res.send("About Page");
// })  

// app. get('/api/products', (req, res) => {
//   res.send("Products");
// })

// app.get ('/api/items', (req, res) => {
//   res.send("Items");
// })

// app.listen(5000, () => {
//   console.log("Server is running on port 5000...." );
// });
