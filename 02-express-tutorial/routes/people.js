const express = require('express');
const router = express.Router();
const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,
} = require("../controlers/people");

//1st way
// //get method HTTP
// router.get('/',getPeople)
// router.post('/',createPerson);
// //postman
// router.post("/postman",createPersonPostman);    
// //Put Method HTTP
// router.put("/:id",updatePerson);    
// //Delete Method HTTP
// router.delete("/:id",deletePerson);

//2nd way
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;