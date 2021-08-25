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

function saveUser(idNum) {
    let storage = new Storage();
    storage.saveItem(storage.getKey, idNum);
    console.log("success");
}

async function getIdNum() {
    let idNumber = document.getElementById('icnumber').value;
    let password = document.getElementById('password').value;

    return (await fetch('https://mstw-hackathon-api.herokuapp.com/user/' + idNumber + "/" + password)).json();
}

async function login(e) {
    e.preventDefault();
    let login;
    try {
        await getIdNum(e).then(res => {
            login = res;
            console.log(login);
            if(login['correctUser'] == true) {
                saveUser(JSON.stringify(login));
                var stateCode = idNumber.slice(6,8);
                console.log(stateCode);
            } else {
                //show incorrect ic number or password dialog box
                //990826075339
                //Kathiressan
            }
        })
    } catch {
        console.log("Error!");
        console.log(e);
    }

    console.log(login);
}





