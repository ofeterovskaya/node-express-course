const express = require("express");
const router = express.Router();

//POst method HTTP
router.post("/", (req, res) => {
    const { name } = req.body;
    return name
        ? res.status(200).send(`Welcome ${name}`)
        : res.status(401).send("Please provide credentials");
});

module.exports = router;