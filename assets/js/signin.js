import { checkIsLogged } from "./cookies.js";

var userName = document.getElementById('username');
var password = document.getElementById('password');
var signInForm = document.getElementById('signin-form');

function emptyValues(userName, password){
    userName.value = "";
    password.value = "";
}

signInForm.addEventListener('submit', async function(e){
    e.preventDefault();
    await postData();
    await getUserData();
    checkIsLogged();
    emptyValues(userName, password);
})

async function postData(){

    await fetch("https://accapp.herokuapp.com/api/signin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName.value,
            password: password.value
        })
    })
}

async function getUserData(){

    await fetch("https://accapp.herokuapp.com/api/signin")
    .then(res => res.json())
    .then(data => {
        if(!data){
            
        }else{
            document.cookie = `isLogged = ${data.isLogged}`;
            document.cookie = `userName = ${data.userName}`;
        }
    })
}