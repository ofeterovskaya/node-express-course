console.log("Express Tutorial");

const express = require("express");
const app = express();
const { products } = require("./data.js");

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});
// When a client sends a GET request to this URL,
// the function (req, res) => { res.json(products); } is called. This function sends a JSON response to the client with the products array.
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (product === undefined) {
    res.status(404).json({ message: "That product was not found." });
  } else {
    res.json(product);
  }
});


app.get('/api/v1/query', (req, res) => {
    let results = products;
  
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().startsWith(searchTerm));
    }
  
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      results = results.slice(0, limit);
    }
    if (req.query.maxPrice) {
        const maxPrice = parseFloat(req.query.maxPrice);
        results = results.filter((p) => p.price <= maxPrice);
      }
  
    res.json(results);
  });


  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
