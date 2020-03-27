const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const https = require('https');

const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'pug');

// app.use(express.bodyParser());


// app.get("/", function(httpRequest, httpResponse, next){
//     httpResponse.write("Hello");
//     next(); //remove this and see what happens 
// });

// app.get("/", function(httpRequest, httpResponse, next){
//     httpResponse.write(" World !!!");
//     httpResponse.end();
// });

// app.listen(PORT);



app.get("/", (req, res, next) => { 
        res.sendFile(path.join(__dirname+'/views/form.html'));
});

const jj = app.post("/invitation-request", (req,res,next)=> {
    let greeting = req.body.greeting;
    let event = req.body.event;
    let text = req.body.text;

    const options = {
        hostname: 'source.unsplash.com',
        path: `/500x500/?${event}`,
        method: 'GET'
    }

    function getUnsplashUrl(options){
        return new Promise((resolve) => {
            let HTTPreq = https.request(options, result =>{
                result.setEncoding('utf8');
                let _header = result.headers;
                let unsplashUrl=_header['location'];
                resolve(unsplashUrl);
            });
            HTTPreq.end();
        })
    }

    getUnsplashUrl(options).
        then(result=>{
            console.log("This is the url for photo", result);
            res.redirect('/loading');
            //res.sendFile(path.join(__dirname+'/views/loading.html'));         
            // res.end()
            return result
        })
        .then(result1=>{
            showInvite(greeting,text,event,result1)});
    return "aaaba"
});

console.log(jj)


app.get("/loading", (req,res,next)=> {
    res.write("loading......")   
    
    // res.end()
});

function showInvite(greeting,text,event,result){
//    res.render('invitation', { title: greeting, message: text, eventImage: result})   
    res.write("invite should be here")
    res.end()
}


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})

