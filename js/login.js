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
    let storage = new Storage();
    storage.saveItem(storage.getKey(), user);
    let encryptedValue = storage.getItem(storage.getKey());
    let decryptedValue = storage.decrypt(encryptedValue);
    console.log(encryptedValue);
    console.log(decryptedValue);
}

async function getIdNum() {
    let idNumber = document.getElementById('icnumber').value.toString();
    let password = document.getElementById('password').value;

    return (await fetch('https://mstw-hackathon-api.herokuapp.com/user/' + idNumber + "/" + password)).json();
}

async function login(e) {
    e.preventDefault();
    let user;
    try {
        await getIdNum(e).then(res => {
            user = res;
            console.log(user);
            if(user['correctUser']) {
                saveUser(JSON.stringify(user));
                
                window.location.href = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/vote_melaka.html";
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
}





