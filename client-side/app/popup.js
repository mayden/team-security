// var LocationBar = require("location-bar");
// var locationBar = new LocationBar();
/*
 class of securityForm, holds all the functions that needed to make the connection.
 */
var securityForm = {
    // hold the url of the server. Is where we are going to send the credentials.
    server_url_login : "https://project-security.herokuapp.com/login",
    //server_url_login : "http://localhost:3000/login",
    server_url_sendUrl : "https://project-security.herokuapp.com/sendUrl",

    send: function(username, password) {

        var http = new XMLHttpRequest();
        http.open("POST", this.server_url_login, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Response from the server
        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                document.getElementById("passForm").innerHTML = http.responseText;
                console.log(http);
            }
        };
        password = deriveMasterSecret(password);
        // send the correct username and password to the server
        http.send("username=" + username + "&password=" + password);
    },

    sendUrl: function(newUrl)
    {
        var http = new XMLHttpRequest();
        http.open("POST", this.server_url_sendUrl, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Response from the server
        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                console.log(http);
            }
        };

        http.send({"url":newUrl});

    }
};

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
//     alert("The browser supports the hashchange event! "+window.location);
// }
//
// function locationHashChanged() {
//     if (location.hash === "#somecoolfeature") {
//         somecoolfeature();
//     }
// }

// $(window).bind('hashchange', function() {
//     alert(window.location);
//     console.log(window.location);
//     securityForm.sendUrl(window.location);
// });

// locationBar.onChange(function (path) {
//     alert("the current url is" + path);
//     console.log("the current url is", path);
//     securityForm.sendUrl(path);
// });
//
// function deriveMasterSecret(pwd){
//    return   PRF(pwd, "master secret",
//        Math.random().toString(36).substring(5)).substring(0, 47);
// }

if (!window.crypto || !window.crypto.subtle) {
    alert("Your browser does not support the Web Cryptography API! This page will not work.");
}
