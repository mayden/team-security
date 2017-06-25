chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
       var passOfSite = request.password;
       var site_username = request.user;
       var email = request.email;
       var url  = sender.url;

        // check which username we take - by email or by text
        var user = (!!site_username) ? site_username : email;


        chrome.storage.sync.get(['username','masterPassword', 'salt', 'urls'], function(items) {

            // encryption and deriving key
            // pass is the password of the website we want to store
            // masterPassword = our master password
            // we are going to derive key from the master password (length of 32)
            var derivedKey = CryptoJS.PBKDF2(items.masterPassword, items.salt, { keySize: 128/32 }).toString(CryptoJS.enc.Text);

            // passOfSite = our secret message
            // keyEncryption = our derived KEY
            var cipherText = CryptoJS.AES.encrypt(passOfSite, derivedKey);


            console.log("items.urls.length: " + items.urls.length);
            var find = false;
            for (var i = 0; i < items.urls.length; i++)
            {
                if (url === items.urls[i].site_url)
                {
                    var tmp = items;

                    //update the url
                    console.log(url);
                    console.log('checking something');

                    tmp.urls[i].site_password = cipherText;

                    find = true;
                    break;
                }
            }
            if (!find)
            {
                console.log('new url');
                // send new url
                // mainUsername, url, username, cipherText
                securityForm.sendUrl(items.username, url, site_username, cipherText);
            }
            else
            {
                console.log('updating url');
                // send old url
                securityForm.updateUrl(items.username, url, site_username, cipherText);
            }
        });


        //Decrypt
        /*
        var bytes  = CryptoJS.AES.decrypt(cipherText.toString(), keyEncryption);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log("plaintext is:" + plaintext);
        */

    }
});

function injectScript() {
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


var securityForm = {
    // hold the url of the server. Is where we are going to send the credentials.
    server_url_login : "https://project-security.herokuapp.com/login",
    //server_url_login : "http://localhost:3000/login",
    server_add_url : "https://project-security.herokuapp.com/addurl",

    send: function(username, password) {

        var http = new XMLHttpRequest();
        http.open("POST", this.server_url_login, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Response from the server
        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                //document.getElementById("passForm").innerHTML = http.responseText;
                if(http.status == 200)
                {
                    var jsonObject = JSON.parse(http.responseText);

                    // Save it using the Chrome extension storage API.
                    chrome.storage.sync.set({
                        'username': jsonObject.username,
                        'masterPassword': jsonObject.password,
                        'salt': jsonObject.salt,
                        'urls': jsonObject.urls,
                    }, function() {
                        // Notify that we saved.
                        console.log('Settings saved');
                    });

                    // refreshing the page after login
                    chrome.runtime.reload();
                }
                else
                {
                    document.getElementById("error").innerHTML = http.responseText;
                }
            }

        };

        var salt = encryptFunctions.makeSalt();
        var newPassword = encryptFunctions.createPassword(password);

       // send the correct username and password to the server
       http.send("username=" + username + "&password=" + newPassword + "&salt=" + salt);
    },
    sendUrl: function(main_username, url, site_username, passSite)
    {
        var http = new XMLHttpRequest();
        http.open("POST", this.server_add_url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Response from the server
        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                var jsonObject = JSON.parse(http.responseText);

                // Save it using the Chrome extension storage API.
                chrome.storage.sync.set({
                    'urls': jsonObject.urls,
                }, function() {
                    // Notify that we saved.
                    console.log('Settings saved #2');
                });

                document.getElementById("success").innerHTML = "Your credentials has been successfully added to our system.";
            }
        };

        http.send("main_username=" + main_username + "&site_url=" + url + "&site_username=" + site_username + "&site_password=" + passSite);

    },
    updateUrl: function(main_username, url, site_username, passSite)
    {
        var http = new XMLHttpRequest();
        http.open("POST", this.server_add_url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Response from the server
        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                document.getElementById("passForm").innerHTML = http.responseText;
            }
        };

        http.send("main_username=" + main_username + "&site_url=" + url + "&site_username=" + site_username + "&site_password=" + passSite);

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

$('#logoutButton').click(function(e) {
    e.preventDefault();

    chrome.storage.sync.clear();

    chrome.runtime.reload();

});

(function () {

    chrome.storage.sync.get(['username','masterPassword', 'salt', 'urls'], function(items) {

        if(!!items.username | !!items.masterPassword)
        {
            document.getElementById("menu").style.display = "block";
            document.getElementById("passForm").innerHTML = "<h3>Welcome back <span class='bolduser'>" + items.username + "!</span></h3>";

        }
    });
})();

