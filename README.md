# team-security

# Server Side:
Implemented server based cloud using Heroku (http://www.heroku.com)
Built Server API with Node.js (based JavaScript)
Support for multiplie users based on database with username and password credintels. 
Passwords are hashed-stored (with salt) in the MongoDB
Users can read\strore data according to their permissions
Unallowed users can’t login to our app


# Client Side:
Building extension to Chrome based JavaScript
Once the user downloaded the app, he registers as a new user with username and password for his choice.
After that, the user connects to the server via the plugin.
Each password file is stored in a different collection on the server
Meanwhile, the password is displayed in site (if stored), otherwise asks user to store if after login. (if password are not equal - asks for update)
