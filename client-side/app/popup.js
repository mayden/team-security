chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
       var pass = request.password;
       var user = request.user;
       var url  = sender.url;
        document.write(url);
    }
});

function injectScript() {

   // var message = document.querySelector('input')[0].value;

    chrome.tabs.executeScript(null, {
        file: "js/myJS.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

//get a reference to the element
var myBtn = document.getElementById('loginUpload');

//add event listener
myBtn.addEventListener('click', function(event) {
    injectScript();
});

// window.onload = onWindowLoad;

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
               // alert(http.responseText.toString());
               // console.log('xhr',http)
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
$('form').on('submit', function(e) {
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#userpass').val();
    securityForm.send(username, password);

});


