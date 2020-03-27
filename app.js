const express = require("express");
const path = require('path');
const router = express.Router();
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.static('views'));
// app.use(express.bodyParser());
app.get("/form", (req, res, next) => { 
        res.sendFile(path.join(__dirname+'/views/form.html'));
});
app.set('view engine', 'pug');

app.post("/invitation-request", (req,res,next)=> {
    
    
    // console.log(req.body);
    // res.send(req.body);
    let greeting = req.body.greeting;
    let event = req.body.event;
    let text = req.body.text;

    
    let unsplash_url = `https://source.unsplash.com/500x500/?${event}`;


    // res.send(`<h1> ${greeting}   </h1> 
    //            <img src=${unsplash}>         
    //         `);


    res.render('invitation', { title: greeting, message: text, eventImage: unsplash_url})

    // create html repsonse file in our views using esj templating 
    

    // res.sendfile(path.join(__dirname+'/views/invitation.html'));
    
});
    

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})