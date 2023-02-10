class action{
    constructor(name="", func=() => {}){
        this.isaction = true;
        this.name = name;
        this.func = func;
    }
}

function reset() {
    document.cookie = ""; 
}

function callEndpoint(endpoint) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            return response;
        }
    };
    xhttp.open("GET", `${window.document.location.hostname}/endpoint`, true);
    xhttp.send();
}


function covertObjectToBinary(obj) {
    let output = '',
        input = JSON.stringify(obj) // convert the json to string.
    // loop over the string and convert each charater to binary string.
    for (i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output.trimEnd();
}
  
function convertBinaryToObject(str) {
    var newBin = str.split(" ");
    var binCode = [];
    for (i = 0; i < newBin.length; i++) {
        binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
    }
    let jsonString = binCode.join("");
    return JSON.parse(jsonString)
}
  
function objectToBase64(obj){
    let bin = covertObjectToBinary(obj);
    let enc = btoa(bin)
    return enc;
}
  
function base64ToObject(str){
    let bin = atob(str)
    let obj = convertBinaryToObject(bin);
    return obj;
}


// get and set cookies from w3schools cuz i'm too lazy to write myself
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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
