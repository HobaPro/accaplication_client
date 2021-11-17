import { getCookie, checkUserName } from "./cookies.js";

var input = document.getElementsByClassName('value-inbut');
var table = document.getElementsByTagName('tbody')[0];
var error_message = document.getElementById('error-message');
var error_message2 = document.getElementById('error-message2');
var modal = document.getElementById('myModal');
var user_info = document.getElementsByClassName('user-info')[0];
var logInBTN;
var userName;
var logout;

var f_balance = document.getElementById('f-balance-i');
var firstBalance;
var currentBalance;
var revenues = document.getElementsByClassName('revenues');
var expenses = document.getElementsByClassName('expenses');
var net_profit_statement = document.getElementById('net-profit-statment');
var totalBalanceV = document.getElementById('total-balance');
var totalRevenuesV = document.getElementById('total-revenues');
var totalExpensesV = document.getElementById('total-expenses');

var BTN = document.getElementById('click-btn');
var BTN_2 = document.getElementById('click-btn-2');


// Insertion Event

//window.addEventListener('load', function (){displayUser();});

displayUser();

BTN.onclick = function(){insert(input);}
BTN_2.onclick = function(){insertF_balance(f_balance.value)};


input[0].addEventListener('focusout', function(){
    if(this.value === "") this.value = 0;
})
input[1].addEventListener('focusout', function(){
    if(this.value === "") this.value = 0;
})

input[0].addEventListener('focus', function(){
    this.value = "";
})
input[1].addEventListener('focus', function(){
    this.value = "";
})

// Create Elements

function createNode(ele, value = "", className = "", id = "", href = ""){
    let element = document.createElement(ele);
    element.className = className;
    element.id = id;
    if(ele === 'a') element.href = href;
    element.innerHTML = value;

    return element;
}

// Check First Balance
function checkF_Balane(f_balance){
    if(f_balance <= 0) return false;
    else return true;
}

function checkF_BalaneEmpty(f_balance){
    if(f_balance === "") return false;
    else return true;
}

// Check Empty Values

function checkValues(input){
    if(input[2].value === "" || input[1].value === "" || input[0].value === "") return false;
    else return true;
}

function checkBalanceValue(input){
    if(input.value <= 0) return false;
    else return true;
}

function checkNumberValues1(input){
    if(input.value > 100000000) return false;
    else return true;
}

function checkNumberValues2(input){
    if(input.value < 0) return false;
    else return true;
}

function acceptedValues(input){

    var tRaw = createNode('tr', "", "raw");

    let tD1 = createNode('td', input[2].value, "cell");
    let tD2 = createNode('td', "", "balance cell");
    let tD3 = createNode('td', input[1].value, "revenues cell");
    let tD4 = createNode('td', input[0].value, "expenses cell");
    tRaw.appendChild(tD1);
    tRaw.appendChild(tD2);
    tRaw.appendChild(tD3);
    tRaw.appendChild(tD4);

    table.appendChild(tRaw);
}

function errorMessage(content){
    error_message.style.display = "block";
    error_message.className = "err-message";
    error_message.innerText = content;
}

function errorMessag2(content){
    error_message2.style.display = "block";
    error_message2.className = "err-message";
    error_message2.innerText = content;
}

function emptyValues(inputs){

    var i;
    for(i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

// Insert Operation

function insert(input){

    // Validation
    if(!checkValues(input)){
        errorMessage("يرجى إدخال جميع البيانات")
    }else{
        if(!checkNumberValues1(input[1]) || !checkNumberValues1(input[0])){
            errorMessage("لقد تجاوزت الحد الأقصى");
        }else{

            if(!checkNumberValues2(input[1]) || !checkNumberValues2(input[2])){
                errorMessage("لا تدخل قيم سالبة");
                emptyValues(input);
            }else{
                acceptedValues(input);
                insertBalance(calculateBalance(parseFloat(currentBalance), revenues, expenses));
                displayTotalRevenues(revenues);
                displayTotalExpenses(expenses);
                displayTotalBalance();
                displayProfits(parseFloat(totalBalanceV.textContent))
                emptyValues(input);
            }
        }
    }

    setTimeout(() => {
        error_message.style.display = "none";
    }, 2000)
}

// Insert First Balance

function insertF_balance(f_balance){

    if(!checkF_BalaneEmpty(f_balance)){
        errorMessag2("يرجى إدخال رصيد أول الفترة");
        f_balance = "";
    }else if(!checkF_Balane(f_balance)){
        errorMessag2("إدخل قيمة منطقية لرصيد أول الفترة");
        f_balance = "";
    }else{
        var tRaw = createNode('tr', "", "raw");

        let tD1 = createNode('td', "رصيد أول الفترة", "cell");
        let tD2 = createNode('td', f_balance, "cell", "first-balance");
        let tD3 = createNode('td', "", "cell");
        let tD4 = createNode('td', "", "cell");
        tRaw.appendChild(tD1);
        tRaw.appendChild(tD2);
        tRaw.appendChild(tD3);
        tRaw.appendChild(tD4);

        table.appendChild(tRaw);

        firstBalance = document.getElementById('first-balance');
        currentBalance = firstBalance.textContent;

        modal.style.display = "none";
    }

    setTimeout(() => {
        error_message2.style.display = "none";
    }, 2000)
}

// Display Balance in Any Operation

function insertBalance(balance){

    var tRaw = createNode('tr', "", "raw");

    let tD1 = createNode('td', "", "cell");
    let tD2 = createNode('td', balance, "balance cell");
    let tD3 = createNode('td', "", "cell");
    let tD4 = createNode('td', "", "cell");
    tRaw.appendChild(tD1);
    tRaw.appendChild(tD2);
    tRaw.appendChild(tD3);
    tRaw.appendChild(tD4);

    table.appendChild(tRaw);
}

// Calculate Total Revenues

function totalRevenues(revenues){

    let revenue;
    let totalRevenues = 0;

    var i;
    for(i = 0; i < revenues.length; i++){
        revenue = parseFloat(revenues[i].textContent);
        totalRevenues += revenue;
    }

    return totalRevenues;
}

// Display Sum Of Total Revenues And First Balance

function displayTotalRevenues(revenues){

    totalRevenuesV.innerText = totalExpenses(revenues);
}

// Calculate Total Expenses

function totalExpenses(expenses){

    let expense;
    let totalExpenses = 0;

    var i;
    for(i = 0; i < expenses.length; i++){
        expense = parseFloat(expenses[i].textContent);
        totalExpenses += expense;
    }

    return totalExpenses;
}

// Display Total Expenses

function displayTotalExpenses(expenses){

    totalExpensesV.innerText = totalExpenses(expenses);
}

// Calculate Balance in any Operation

function calculateBalance(currentBalance, revenues, expenses){

    return ((currentBalance + totalRevenues(revenues)) - totalExpenses(expenses));
}

// Calculate Total Balance

function totalBalance(currentBalance ,totalRevenues, totalExpenses){

    return ((parseFloat(currentBalance) + parseFloat(totalRevenues)) - parseFloat(totalExpenses));
}

// Display Total Balance

function displayTotalBalance(){

    totalBalanceV.innerText = totalBalance(currentBalance, totalRevenuesV.textContent, totalExpensesV.textContent);
}

function displayProfits(totalBalance){
    let profit;
    let isProfit; 
    if(totalBalance < 0){
        profit = "الخسارة";
        isProfit = false;
    }
    else{
        profit = "الربح";
        isProfit = true;
    }

    net_profit_statement.innerText = `صافى ${profit}`;

    if(!isProfit){
        net_profit_statement.className = "net-loss";
    }else{
        net_profit_statement.className = "net-profit";
    }
}

function displayUser(){
    if(!checkUserName()){
        logInBTN = createNode('a', "Login", "", "login-btn", "/signin");
        user_info.appendChild(logInBTN);
        userName.style.display = "none";
        logout.style.display = "none";
    }else{
        userName = createNode('h3', checkUserName(), "user");
        logout = createNode('button', "Logout", "", "logout-btn");
        user_info.appendChild(userName);
        user_info.appendChild(logout);
    }
}

logout.addEventListener('click', function(){ logOut() });

function logOut(){
    document.cookie = `userName = `;
    document.cookie = `isLogged = false;`;
    displayUser();
}

window.addEventListener('load', function(){checkCookies()})

function checkCookies(){
    if(!navigator.cookieEnabled) {
        alert("Please Enable Cookies");
        return false;
    }else{
        return true
    }
}

logInHandle();
function logInHandle(){
    if(!checkCookies()){
        console.log("hello")
        logInBTN.className = "disabled";
    }
}