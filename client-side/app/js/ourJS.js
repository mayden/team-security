// Upload the CryptoJS library to our DOM

chrome.storage.sync.get(['username', 'masterPassword', 'salt','urls'], function (items) {
        var password = '';
        var username = '';
        for (var i = 0; i < items.urls.length; i++) {

            if (window.location.href === items.urls[i].site_url || document.location.origin == items.urls[i].site_url || document.location.origin + "/" == items.urls[i].site_url) {
                username = items.urls[i].site_username;

                //Decrypt
                var keyEncryption = CryptoJS.PBKDF2(items.masterPassword, items.salt, { keySize: 128/32 }).toString(CryptoJS.enc.Text);
                var bytes  = CryptoJS.AES.decrypt(items.urls[i].site_password, keyEncryption);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);

                password = plaintext;
                break;
            }
        }
        document.querySelectorAll('input[type=password]')[0].value = password;

        if (typeof document.querySelectorAll('input[type=email]')[0] !== 'undefined') {
            document.querySelectorAll('input[type=email]')[0].value = username;
        }
        else if (typeof document.querySelectorAll('input[type=text]')[0] !== 'undefined') {
            document.querySelectorAll('input[type=text]')[0].value = username;
        }
    });
