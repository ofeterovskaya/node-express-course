const { people } = require("../data");

const getPeople = (req, res) => {   
    res.status(200).json({ success: true, data: people });
}
const createPerson = (req, res) => {
    const { name } = req.body;
    if(!name){
        return res
            .status(400)
            .json({ success: false, msg: "Please provide name value" });
    }
    res.status(201).json({ success: true, person: name }); 
}
const createPersonPostman =  (req, res) => {
    const { name } = req.body;
    if(!name){
        return res
            .status(400)
            .json({ success: false, msg: "Please provide name value" });
    }
    //instead of sending a response with a new array that includes the new person's name, we're pushing a new object to the people array. 
    //This new object includes an id (which is one more than the current length of the people array) and the name from the request body. 
    //Then, we're sending a response with the updated people array.
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, data: people }); 
}
const updatePerson = (req, res) => {
    const personId = parseInt(req.params.id, 10);
    const person = people.find(person => person.id === personId);
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${personId}` });
    } 
    person.name = req.body.name;
    res.status(200).json({ success: true, data: person });
}


const deletePerson = (req, res) => {
    const personId = parseInt(req.params.id, 10);
    const personIndex = people.findIndex(p => p.id === personId);
    if (personIndex < 0) {
        return res
            .status(404)
            .json({ message: "Person not found" });
    }
    people.splice(personIndex, 1); 
    return res.status(200).json({ success: true, data: newPeople });
}

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,
}


//leave this code here for learning purposes
// const updatePerson = (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     const person = people.find((person) => person.id === Number(id));
//     if(!person){
//         return res
//             .status(404)
//             .json({ success: false, msg: `no person with id ${id}` });
//     }
//     const newPeople = people.map((person) => {
//     if(person.id === Number(id)){
//         person.name = name;
//     }
//     return person;
//     });
//     res.status(200).json({ success: true, data: newPeople });
// }
// const deletePerson = (req, res) => {
//     const person = people.find((person) => person.id === Number(req.params.id));
//         if(!person){
//             return res
//             .status(404)
//             .json({ success: false, msg: `no person with id ${req.params.id}` });
//         }
//     const newPeople = people.filter(
//         (person) => person.id !== Number(req.params.id)
//     );
//     return res.status(200).json({ success: true, data: newPeople });
// }
// const createPersonPostman =  (req, res) => {
//     const { name } = req.body;
//     if(!name){
//         return res
//             .status(400)
//             .json({ success: false, msg: "Please provide name value" });
//     }
//     res.status(201).json({ success: true, data: [...people, name] }); 
// }