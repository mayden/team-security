
/*
 class of securityForm, holds all the functions that needed to make the connection.
 */

var isLogin=false;
var securityForm = {
    // hold the url of the server. Is where we are going to send the credentials.
    server_url_login : "https://project-security.herokuapp.com/login",
   // server_url_login : "http://localhost:3000/login",
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
                alert(http.responseText);
                console.log(http.responseText);
                if(http.responseText === "First Time" || http.responseText==="OK")
                {
                    var para = document.createElement("p");
                    var node = document.createTextNode("This is new.");
                    para.appendChild(node);
                    var element = document.getElementById("login");
                    element.appendChild(para);
                    chrome.storage.sync.set({
                        username: username,
                    }, function() {
                        // Update status to let user know options were saved.
                        setTimeout(function() {
                            status.textContent = '';
                        }, 750);
                })}
            }

        };
        var salt = encryptFunctions.makeSalt();
        var newPassword = encryptFunctions.createPassword(password);

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
// if (!isLogin) {
//     var contain =" <form id='passForm'><div class='container'>" +
//         " <label><b>Username</b></label>" +
//         "<input type='text' placeholder='Enter Username' name='username' id='username' required> " +
//         "<label><b>Password</b></label> " +
//         "<input type='password' placeholder='Enter Password' name='pdsw' id='userpass' required> " +
//         "<button type='submit'>Login</button>" +
//         "</div></form>";
//      document.getElementById("div_form").innerHTML = contain;
// }