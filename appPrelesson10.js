const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://joshedw:Piercedsquid22!@nodejosh.xbpwpj9.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));

// register view engine
app.set('view engine','ejs');

// set a folder called myviews that holds templates (instead of defualt views)
// app.set('views','myviews');

//listen for requests

// app.listen(3000);

//middleware and static files
app.use(morgan('dev'));
// app.use(morgan('tiny'));
app.use(express.static('public'));


// mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog= new Blog({
        title: 'new-blog 2',
        snippet:'about my new blog',
        body:'more about my new blog'
    });

    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('633deeca03016cb3ace4c00a')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
})

// app.use((req,res, next)=>{
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// app.get('/',(req, res)=>{
//     res.send('<p>home page<p>');
//     //automatically sets content type header, also infers status code so we don't need to set
//     //this manually
// });

// app.get('/about',(req, res)=>{
//     res.send('<p>about page<p>');
// });

app.get('/',(req, res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req, res)=>{
    res.render('about', {title:'About'});
});

//these are blog routes
app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1 })
    .then((result)=>{
        res.render('index',{title: 'All Blogs', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    });
})


app.get('/blogs/create',(req,res)=>{
    res.render('create', {title:'Create a new Blog'});
})

//404 error
app.use((req, res)=>{
    res.status(404).render('404', {title:'404'});
});