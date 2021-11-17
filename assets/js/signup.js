import { checkIsRegister } from "./cookies.js";

var userName = document.getElementById('username');
var password = document.getElementById('password');
var r_password = document.getElementById('r-password');
var signUpForm = document.getElementById('signup-form');

function emptyValues(userName, password){
    userName.value = "";
    password.value = "";
    r_password.value = "";
}

signUpForm.addEventListener('submit', async function(e){
    e.preventDefault();
    await postData();
    await getUserData();
    checkIsRegister();
    emptyValues(userName, password);
})

async function postData(){

    await fetch("https://accapp.herokuapp.com/api/signup", {
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

    let res = await fetch("https://accapp.herokuapp.com/api/signup");
    res = await res.json();
    if(!res){

    }else{
        document.cookie = `isRegister = ${res.isRegister}`;
    }
}