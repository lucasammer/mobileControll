function callEndpoint(endpoint, _callback=()=>{}){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = xhttp.responseText;
            _callback(response)
        }
    };
    xhttp.open("GET", `${window.location.origin}/${endpoint}`, true);
    xhttp.send();
}

const checkPass = () => {
    const cb1 = (res) => {
        if(res != pass)
        document.getElementById("gated").innerHTML = "<p>Authentication failed</p>";
    }

    const cb = (res) => {
        if(res.hasOwnProperty("pass")){
            hash(getCookie("_pass"), cb1)
            let pass = res["pass"]
        }
    }

    callEndpoint("api?action=getAll", cb);
}

const hash = (val, _callback=()=>{})=>{
    let cb;
    if(_callback==(()=>{})){
        let cb = (res) => {
            return res;
        }
    }else{
        let cb = (res) => {
            _callback(res)
        }
    }
    callEndpoint(`api?action=hash&val=${val}`, cb)
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
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
