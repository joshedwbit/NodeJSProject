const { response } = require('express');
const express = require('express');

// express app
const app = express();

//listen for requests

app.listen(3000);

// app.get('/',(req, res)=>{
//     res.send('<p>home page<p>');
//     //automatically sets content type header, also infers status code so we don't need to set
//     //this manually
// });

// app.get('/about',(req, res)=>{
//     res.send('<p>about page<p>');
// });

app.get('/',(req, res)=>{
    res.sendFile('./views/index.html', {root:__dirname});
});

app.get('/about',(req, res)=>{
    res.sendFile('./views/about.html', {root:__dirname});
});


//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

//404 error
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root:__dirname});
});