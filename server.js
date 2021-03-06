

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app=express();
var portno = process.env.PORT ||3000;


hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentDate',()=>{
    return new Date().getFullYear()

});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');

// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// })


app.use((req,res,next)=>{
    var time = new Date().toString();
    var logdata = `Logged at ${time} ${req.method} ${req.url}`
    fs.appendFile('server.log',logdata + '\n',(err)=>{
        if(err){
    console.log('Cannot update log');
     }
    });
    console.log(logdata);
    next();
})

app.get('/', (req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page'
       
    }) ;
});

app.get('/project', (req,res)=>{
    res.render('project.hbs',{
        pageTitle:'Project Page'
       
    }) ;
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        aboutme:'I am Niyati'
       }) ;
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Cannot Handle the request"
    });
});

app.listen(portno,()=>{
    console.log(`Listening to Port: ${portno}`);
});