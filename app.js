const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const https = require('https');
const formidable = require('express-formidable');

const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(formidable());

app.set('view engine', 'pug');

app.get("/", (req, res, next) => { 
        res.sendFile(path.join(__dirname+'/views/form-1.html'));
});

    
app.post("/invitation-request", (req,res,next)=> {

    //req.

    // let greeting = req.body.greeting;
    // let event = req.body.event;
    // let text = req.body.text;

    let greeting = req.fields.greeting
    let event = req.fields.event;
    let text = req.fields.text;


    console.log("recieved", greeting, event, text)
    // console.log("recieved1 ", req.fields.greeting);


    const options = {
        hostname: 'source.unsplash.com',
        path: `/5000x5000/?${event}`,
        method: 'GET'
    }

    let imageSplashUrl = new Promise((resolve,reject)=>{
        let HTTPreq = https.request(options, result =>{
            result.setEncoding('utf8');
            let _header = result.headers;
            let unsplashUrl=_header['location'];
            console.log(unsplashUrl);
            setTimeout(() => {resolve(unsplashUrl)}, 1000);
        });
        HTTPreq.end()
    })

    imageSplashUrl.then((result)=>{
        res.render('invitation-1', { greeting: greeting, message: text, eventImage: result})
    })

    // imageSplashUrl.then((result)=>{
    //     res.render('invitation', { greeting: greeting, message: text, eventImage: result})
    // })


});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})

