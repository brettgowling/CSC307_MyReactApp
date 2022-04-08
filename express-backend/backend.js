const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ';
const characters_length = 62;


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! :)');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if ((name != undefined) && (job != undefined)){
        let result = findUserByNameAndJob(name,job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (job != undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

const findUserByNameAndJob = (name,job) => { 
    return users['users_list'].filter( (user) => (user['name'] === name) && (user['job'] === job) ); 
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    giveUserAnID(userToAdd);
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function giveUserAnID(user){
    var id = '';
    for(var i = 0; i < 6; i++){
        id += characters.charAt(Math.floor(Math.random() * characters_length));
    }
    user['id'] = id;
}

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        delUser(result);
        res.status(204).end();
    }
});

function delUser(user){
    const index = users['users_list'].indexOf(user);
    return users['users_list'].splice(index, 1);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});     