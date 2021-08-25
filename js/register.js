const form = document.getElementById('registerForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let icnumber = document.getElementById('icnumber').value;
    let password = document.getElementById('password').value;

    fetch('https://mstw-hackathon-api.herokuapp.com/user', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            icnumber: icnumber,
            password: password
        })
    })
    .then((res) => res.json())
    .then((data) =>
        console.log(data))

});