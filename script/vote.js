//Vote Button On Clicked
$(".voteBtn").click(function (e){
    e.preventDefault();
    var voteName = $(this).data("name").replace('_', ' ');
    var voteID = $(this).data("id");
    console.log("here "+$(this).data("id"));
    console.log(this);
    var voteTotal = $(this).data("votes");
    console.log(voteID);
    Swal.fire({
        icon: "info",
        title: "Are you sure you want to vote for ",
        html: voteName + " ?",
        confirmButtonText: "Vote",
        showCancelButton: true
    }).then(result => {
        if (result.isConfirmed){
            //Add TotalVotes to database
            fetch('https://mstw-hackathon-api.herokuapp.com/minister/'+voteID, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    votes: voteTotal++
                })
            }).then((res) => res.json()
            ).then((data) =>
                console.log(data));
            
            //Update HasVoted in database
            let storage = new Storage();
            var userIC = storage.getItem("icNumber");
            console.log(userIC);
            
            fetch('https://mstw-hackathon-api.herokuapp.com/user/'+userIC, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hasVoted: true
                })
            }).then((res) => {
                console.log(res.status);
                if (res.status == 200){
                    localStorage.setItem("hasVoted", "true");
                    $(".voteBtn").addClass("disabled");
                }
            });
            
            Swal.fire({
                icon:"success",
                title: "Voted success!"
            })
        }
    });
});

//Get Menteri Details from Firebase
function getDetails(){
    //Preprocess URL
    var pathname = $(location).attr('pathname').slice(18,24)
    pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    console.log(pathname);

    if (pathname != "Html"){
        fetch('https://mstw-hackathon-api.herokuapp.com/minister/'+pathname, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((data) => {
            console.log(data)
            //Menteri A
            $("#voteA").data("name", data[0].name);
            $("#voteA").data("state", data[0].state);
            $("#voteA").data("id", data[0]._id);
            $("#voteA").data("votes", data[0].votes);
            $("#nameA").text(data[0].name.replace('_', ' '));
            $("#stateA").text(data[0].state);
            $("#partyA").text(data[0].party);
            $("#votesA").text(data[0].votes);

            //Menteri B
            $("#voteB").data("name", data[1].name);
            $("#voteB").data("state", data[1].state);
            $("#voteB").data("id", data[1]._id);
            $("#voteB").data("votes", data[1].votes);
            $("#nameB").text(data[1].name.replace('_', ' '));
            $("#stateB").text(data[1].state);
            $("#partyB").text(data[1].party);
            $("#votesB").text(data[1].votes);
        });
    }
}

//Check if user has voted already
function isUserVoted(){
    //Get user voted from local storage
    var userVoted = localStorage.getItem("hasVoted");

    //Disable buttons accordingly
    if (userVoted == "true"){
        $(".voteBtn").addClass("disabled");
    }
}

//Update DOM after loaded
$(document).ready(function(){
    getDetails();
    isUserVoted();
});