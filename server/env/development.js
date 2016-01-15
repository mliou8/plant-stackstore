module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
  },
  "FACEBOOK": {
    "clientID": "1705701483049480",
    "clientSecret": "9f6253ed6a6b1f009ba70f6cd7a94a4d",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "30278897951-7f18t36934m76c98n2jh91ogt1g6rdk2.apps.googleusercontent.com",
    "clientSecret": "JE-PnqkFn_j2hCksjnLmFGNQ",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};