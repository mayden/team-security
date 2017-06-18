/*
 class of securityForm, holds all the functions that needed to make the connection.
 */
var securityForm = {
    // hold the url of the server. Is where we are going to send the credentials.
    server_url : "https://project-security.herokuapp.com/login",
    //server_url : "http://localhost:3000/login",

    send: function(username, password) {

        var http = new XMLHttpRequest();
        http.open("POST", this.server_url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Response from the server
        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                document.getElementById("passForm").innerHTML = http.responseText;
                console.log(http);
            }
        }

        // send the correct username and password to the server
        http.send("username=" + username + "&password=" + password);
    }
}

/*
 * On submitting the form, the username and the password credentials are sent to the server.
 */
$('#passForm').on('submit', function(e) {
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#userpass').val();

    securityForm.send(username, password);
});

//listener to url
// if ("onhashchange" in window) {
//     alert("The browser supports the hashchange event!");
// }
//
// function locationHashChanged() {
//     if (location.hash === "#somecoolfeature") {
//         somecoolfeature();
//     }
// }

$(window).bind('hashchange', function() {
    alert(window.location);
});
