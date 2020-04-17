const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('../schema/schema')

const app = express();

app.use(cors());

mongoose.connect("mongodb+srv://Cardorel_380:C%40rdo%400103@cluster0-htere.mongodb.net/InterfaceProf?retryWrites=true&w=majority" , {useNewUrlParser: true , useUnifiedTopology: true})

mongoose.connection.once('open' , ()=>{
    console.log('Connected with Mongoose DB');
    
})

app.use('/graphql' , graphqlHTTP({
    schema,
    graphiql: true
}) )



app.listen(7000 , () =>{
    console.log("Listen for 7000");
})