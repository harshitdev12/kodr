// express app that serves html files 

var express = require('express');
var path = require('path');
var app = express();
app.use(express.json());

app.set('view engine', 'ejs');
const Url = process.env.BACKEND_URL || 'http://backend:5000/api';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.static(path.join(__dirname, 'public')));
app.post('/api', async function(req, res){
    const response = await 
fetch(Url,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});

app.get('/', async function(req, res) {
    const options = {
        method: 'GET',
    };
    fetch(Url, options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
        try {
            let response = await fetch(Url, options);
            response = await response.json();
            res.render('index', response)
        } catch (err) {
            
            console.log(err);
            res.status(500).json({msg: 'internal server error.'});
        }
}); 
app.listen(3000, function() {
    console.log('Frontend app listening on port 3000!');
});