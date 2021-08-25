//const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");

const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", login);

// function login(e) {
//     e.preventDefault();
//     console.log("clicked");
//     let icnumber = document.getElementById('icnumber').value;
//     let password = document.getElementById('password').value;

//     fetch('https://mstw-hackathon-api.herokuapp.com/user/' + icnumber + "/" + password)
//         .then((res) => {
//             const loginFunction = async () => {
//                 const data = await res.json();
//                 console.log(data);
//             }
//             loginFunction();

//         })
// }

function saveUser(user) {
    user = JSON.parse(user);
    localStorage.setItem("hasVoted", user.hasVoted ? "true" : "false");
    localStorage.setItem("icNumber", document.getElementById('icnumber').value.toString());
}

async function getIdNum() {
    let idNumber = document.getElementById('icnumber').value.toString();
    let password = document.getElementById('password').value;

    return (await fetch('https://mstw-hackathon-api.herokuapp.com/user/' + idNumber + "/" + password)).json();
}

async function login(e) {
    e.preventDefault();
    let user;
    if (!$("#icnumber").val() || !$("#password").val()){
        Swal.fire({
            icon: "warning",
            title: "Input cannot be empty! Please try again!",
        });
    }
    else{
        try {
            await getIdNum(e).then(res => {
                user = res;
                console.log(user);
                if(user['correctUser']) {
                    console.log("hello there");
                    saveUser(JSON.stringify(user));
                    if (user.state == "Melaka" || user.state == "Malacca"){
                        window.location.href = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/vote_melaka.html";
                    }
                    else if (user.state == "Perlis"){
                        window.location.href = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/vote_perlis.html";
                    }
                    else{
                        window.location.href = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/vote.html";
                    }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "User does not exist!",
                        html: `<center><a href="register.html" style="background: none;"> Register an account? </a></center>`
                    });
                }
            })
        } catch {
            console.log("Error!");
            console.log(e);
        }
    }
}





