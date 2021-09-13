import express from 'express'; // Web Framework for nodejs 
import { v4 as uuidv4 } from 'uuid'; //Get unique id every time

const router = express.Router(); //using express for routing

let users = [
    {
        "firstName": "John",
        "lastName": "Doe",
        "age": 25,
        "id": "fcb4efa5-608d-4d91-aed3-33af404928ae"
      },
      {
        "firstName": "Johny",
        "lastName": "Doe",
        "age": 25,
        "id": "2fb6fed6-43f3-4ee6-ab04-2bd3782c1886"
      },
      {
        "firstName": "Jason",
        "lastName": "Dew",
        "age": 30,
        "id": "a4f12aa0-8fd5-473d-9834-aa98a2bdd84c"
      },
      {
        "firstName": "BSon",
        "lastName": "DB",
        "age": 40,
        "id": "179c592c-1d4d-451c-808c-e72749e9c880"
      }
] //variable used to store data  


// GET METHOD i.e. Read request can done from browser
router.get('/', (req, res)=>{
    // console.log(users);
    res.send(users);
});


// POST METHOD i.e. CREATE request can be done from POSTMAN/THUNDER CLIENT 
router.post('/', (req, res)=>{
    // console.log('POST ROUTE Reached');
    // console.log(req.body);

    const user = req.body; //when post request implemented, data stored in body and stored in variable i.e. 'user'
    const userID = uuidv4(); // For unique id⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const userWithID = { ...user, id: userID } //Spread Operator
    users.push(userWithID); //With Push Function it will add data in "users" array
    
    // res.send('POST ROUTE Reached');
    res.send(`User with the name ${user.firstName} added to the database.`); // Confirmation message on client side
});


// GET METHOD via passing id, Read request can done from browser
router.get('/:id', (req, res)=>{
    // console.log(req.params);
    // res.send('THE GET ID ROUTE');
    // res.send(req.params);

    const { id } = req.params; //id will store in params and stored in variable
    const foundUser = users.find((user)=> user.id == id); //using find filter to fetch exact same id
    res.send(foundUser);
         
});


// DELETE METHOD via passing id i.e. DELETE request can be done from POSTMAN/THUNDER CLIENT
router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    users = users.filter((user)=> user.id !== id);
    res.send(`User with the id ${id} deleted from the database`);
});


// PATCH METHOD(PARTIAL MODIFICATION) request via passing id i.e. UPDATE request can be done from POSTMAN/THUNDER CLIENT
router.patch('/:id', (req, res)=>{
    const { id }=req.params;
    const { firstName, lastName, age } = req.body;
    
    const user = users.find((user)=> user.id === id);

    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (age) {
        user.age = age;
    }

    res.send(`User with the id ${id} has been updated`);

});


// Note - PUT method is used to completely overwrite
export default router;