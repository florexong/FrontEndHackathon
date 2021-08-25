//Vote Button On Clicked
$(".voteBtn").click(function (e){
    e.preventDefault();
    var voteName = $(this).data("name");
    var voteType = $(this).data("type"); //A or B
    var voteState = $(this).data("state"); //Melaka or Perlis 
    Swal.fire({
        icon: "info",
        title: "Are you sure you want to vote for ",
        html: voteName + " ?",
        confirmButtonText: "Vote",
        showCancelButton: true
    }).then(result => {
        if (result.isConfirmed){
            //add vote to db
            //tis user is now voted
            Swal.fire({
                icon:"success",
                title: "Voted success!"
            })
        }
    });
});