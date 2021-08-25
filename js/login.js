const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", login);

function login(e) {
    e.preventDefault();
    console.log("clicked");
    let icnumber = document.getElementById('icnumber').value;
    let password = document.getElementById('password').value;

    fetch('https://mstw-hackathon-api.herokuapp.com/user/' + icnumber + "/" + password)
        .then((res) => {
            const loginFunction = async () => {
                const data = await res.json();
                console.log(data);
            }
            loginFunction();
        })
}
