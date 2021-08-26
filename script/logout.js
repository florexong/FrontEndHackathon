//Sign Out
$("#logout").click(function (e){
    localStorage.clear();
    window.location.href = "https://florexong.github.io/FrontEndHackathon/";
})

//Check if the local storage is empty
$(document).ready(function (){
    //Always redirect user back to home page since the user is not yet logged in
    if (localStorage.length == 0){
        var home = window.location.href = "https://florexong.github.io/FrontEndHackathon/";
        if (window.location.href != home){
            window.location.href = "https://florexong.github.io/FrontEndHackathon/";
        }
    }
});

//About the developers
$("#aboutUs").click(function (e){
	e.preventDefault();
	Swal.fire({
		title: "Meet the team",
		html: `
		Ong Pei Yong</br>
		Ong Shuoh Chwen</br>
		Ganesan a/l Kohilan</br>
		Kathiressan A/L Sivanes</br>
        Muhammad Afham bin Md Awal-ludin`,
        footer: "Made with ☕ and ❤️"
	});
});