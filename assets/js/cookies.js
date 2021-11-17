function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkIsRegister() {
    let cookie = getCookie("isRegister");
    console.log(cookie);
    
    if(cookie != "true") alert("فشل إنشاء الحساب حاول مرة أخرى");
    else{
        alert("تم إنشاء الحساب بنجاح");
        window.location.pathname = '/signin'; 
    }
}

function checkIsLogged() {
    let cookie = getCookie("isLogged");
    
    if(cookie != "true") alert("Not User");
    else window.location.pathname = '/';
}

function checkUserName(){
    let cookie = getCookie("userName");

    if(cookie != "") return cookie;
    else return false;
}

export {
    getCookie,
    checkIsRegister,
    checkIsLogged,
    checkUserName
}