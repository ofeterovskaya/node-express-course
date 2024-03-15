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

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }
  
  return res.json(product);
});


// app.get('/api/v1/query', (req, res) => {
//     let results = products;
  
//     if (req.query.search) {
//       const searchTerm = req.query.search.toLowerCase();
//       results = results.filter((p) => p.name.toLowerCase().startsWith(searchTerm));
//     }
  
//     if (req.query.limit) {
//       const limit = parseInt(req.query.limit);
//       results = results.slice(0, limit);
//     }
//     if (req.query.maxPrice) {
//         const maxPrice = parseFloat(req.query.maxPrice);
//         results = results.filter((p) => p.price <= maxPrice);
//       }
  
//     res.json(results);
//   });
app.get('/api/v1/query', (req, res) => {
  const { search, limit = 0, maxPrice = 0 } = req.query;

  const maxLimit = parseInt(limit, 10);

  // use Array.reduce to build a list of filtered products
  const filteredProducts = products.reduce((acc, product) => {
      // if the product price is greater than maxPrice OR
      // if there's a search and the product name doesn't include the search term OR
      // if there’s a limit and the accumulator (acc === list of filtered products) hit the limit
      // then return the accumulator (acc === list of filtered products)
      if (
          product.price > parseFloat(maxPrice) || 
          (search && !product.name.includes(search)) ||
          (maxLimit && acc.length === maxLimit)
      ) {
          return acc;
      }
     
      // add product to accumulator list
      acc.push(product);

      // return the accumulator to check the next product
      return acc;
  }, []);

  res.status(200).json(filteredProducts);
});

  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
