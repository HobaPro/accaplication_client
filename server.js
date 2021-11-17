const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.static(path.join(__dirname, '/assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/index.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/signup.html'));
})

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/signin.html'));
})


app.listen(process.env.PORT || 8080, err => {
    if(err) console.log(err);
    else console.log("All Right");
})