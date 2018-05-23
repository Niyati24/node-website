const express = require('express');

var app=express();

app.get('/', (req,res)=>{
   res.send({
  name:"Niyati",
  address:"Brussels"
   }) ;
});

app.get('/about', (req,res)=>{
    res.send('this is about'
   ) ;
 });

app.listen(3000);