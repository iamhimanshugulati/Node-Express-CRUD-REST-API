import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js'

const app = express();
const PORT = 5000;


app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res)=>res.send('This is Homepage, kindly refer json file here http://localhost:5000/users'));


app.listen(PORT, (req, res)=> console.log(`Server is Running on port http://localhost:${PORT}`));