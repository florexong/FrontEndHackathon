const form = document.getElementById('registerForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let icnumber = document.getElementById('icnumber').value;
    let password = document.getElementById('password').value;

    //Preprocess state
    let state = "";
    let stateCode = icnumber.slice(6,8).toString();
    if (stateCode == "09" || stateCode == "40"){state = "Perlis";}
    else if (stateCode == "04" || stateCode == "30"){state = "Melaka";}
    else if (stateCode == "01" || stateCode == "21" || stateCode == "22" || stateCode == "23" || stateCode == "24"){state = "Johor";}
    else if (stateCode == "02" || stateCode == "25" || stateCode == "26" || stateCode == "27"){state = "Kedah";}
    else if (stateCode == "03" || stateCode == "28" || stateCode == "29"){state = "Kelantan";}
    else if (stateCode == "05" || stateCode == "31" || stateCode == "59"){state = "Negeri Sembilan";}
    else if (stateCode == "06" || stateCode == "32" || stateCode == "33"){state = "Pahang";}
    else if (stateCode == "07" || stateCode == "34" || stateCode == "35"){state = "Pulau Pinang";}
    else if (stateCode == "08" || stateCode == "36" || stateCode == "37" || stateCode == "38" || stateCode == "39"){state = "Perak";}
    else if (stateCode == "10" || stateCode == "41" || stateCode == "42" || stateCode == "43" || stateCode == "44"){state = "Selangor";}
    else if (stateCode == "11" || stateCode == "45" || stateCode == "46"){state = "Terengganu";}
    else if (stateCode == "12" || stateCode == "47" || stateCode == "48" || stateCode == "49"){state = "Sabah";}
    else if (stateCode == "13" || stateCode == "50" || stateCode == "51" || stateCode == "52" || stateCode == "53"){state = "Sarawak";}
    else if (stateCode == "14" || stateCode == "54" || stateCode == "55" || stateCode == "56" || stateCode == "57"){state = "Kuala Lumpur";}
    else if (stateCode == "15" || stateCode == "58"){state = "Labuan";}
    else if (stateCode == "16"){state = "Putrajaya";}
    else{state = "Negeri Tidak Diketahui";}

    fetch('https://mstw-hackathon-api.herokuapp.com/user', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            icnumber: icnumber,
            password: password,
            state: state,
        })
    })
    .then((res) => {
        if (res.status == 200){
            login(e);
        }
    });

});

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
                        window.location.href = "https://florexong.github.io/FrontEndHackathon/vote_melaka.html";
                    }
                    else if (user.state == "Perlis"){
                        window.location.href = "https://florexong.github.io/FrontEndHackathon/vote_perlis.html";
                    }
                    else{
                        window.location.href ="https://florexong.github.io/FrontEndHackathon/vote.html";
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