const http = require('http');
const fs=require('fs');
const _=require('lodash');

const server=http.createServer((req, res)=>{
    // console.log(req.url, req.method);

    //lodash
    // const num=_.random(0,20);
    // console.log(num)

    // const greet=_.once(()=>{
    //     console.log('hello');
    // });

    // greet();



    res.setHeader('Content-Type', 'text/html');
    // res.write('<p>hello, people</p>');
    // res.end();

    let path='./views/';
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode=200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode=404;
            break;
    }


    fs.readFile(path,(err, data) =>{
        if (err){
            console.log(err);
            res.end()
        }else{
            // res.write(data);
            res.end(data)
        }
    })
});
//req contains url being requested, request type, etc.
//res object; object used to send a response to the browser


server.listen(3000, 'localhost',()=>{
    console.log('listening for requests on port 3000')
})
//takes port number as an argument, as well as hostname.