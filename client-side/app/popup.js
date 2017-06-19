
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
            }
        };
        var salt = encryptFunctions.makeSalt();
        var newPassword = encryptFunctions.createPassword(password, salt);

       // send the correct username and password to the server
       http.send("username=" + username + "&password=" + newPassword + "&salt=" + salt);
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

