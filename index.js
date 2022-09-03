require('dotenv').config();
const express = require('express')
const authRoute = require('./routes/auth.route')
const mongo = require('./shared/mongo')

const app = express();
const PORT =process.env.PORT || 3001;

(async () => {

  await mongo.connect();

  app.use(express.json())

  console.log("Not Middleware preasent ")

  app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html/>
    <html>
    
    <head>
      <title>MarkDown</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,700&family=Rubik+Moonrocks&display=swap"
        rel="stylesheet">
    
      <style>
        * {
          text-align: center;
          padding: auto;
    
        }
    
        body {
          background-image: url("https://static.vecteezy.com/system/resources/previews/005/006/681/large_2x/plumbing-service-with-plumber-workers-repair-maintenance-fix-home-and-cleaning-bathroom-equipment-in-flat-background-illustration-vector.jpg");
        }
    
        h1 {
    
          font-family: 'Amiri', serif;
          color: darkred;
        }
    
        .log {
          padding: 10px;
          width: 400px;
          height: 400px;
          margin: 7em auto;
          border-radius: 1.5em;
          box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
          text-align: center;
          background-image: url("");
    
        }
    
        .username {
          margin: 8px;
          font-size: medium;
          font-family: 'Amiri', serif;
    
    
        }
    
        .password {
          margin: 8px;
          font-size: medium;
          font-family: 'Amiri', serif;
    
        }
    
        button {
          margin: 8px;
          font-size: 15px;
          font-weight: 900;
          color: white;
          font-family: 'Amiri', serif;
          border-radius: 5px;
          background-color: blue;
          height: 35px;
          width: 75px;
    
        }
    
        .forgot {
          color: red;
          margin: 8px;
          font-size: medium;
          font-family: 'Amiri', serif;
    
    
        }
    
        span {
          font-weight: 900;
    
          font-size: medium;
          font-family: 'Amiri', serif;
        }
    
        .a {
          font-weight: 900;
    
          font-size: medium;
          font-family: 'Amiri', serif;
        }
    
        .java {
          font-weight: 900;
    
          font-size: medium;
          font-family: 'Amiri', serif;
        }
    
        input {
          height: 30px;
          width: 250px;
          border-radius: 4px;
        }
      </style>
    
    </head>
    
    <body>
      <h1>Near Worker</h1>
    
      <form class="log">
        <br>
    
        <label
          style="font-size:large;font-weight: 900; font-family: 'Amiri', serif; color:rgb(17, 26, 148);font-family: 'Amiri', serif; "
          for="username">Username</label><br>
        <input class="username" type="text" placeholder="Username" /><br>
        <label style="font-size:large; font-weight: 900; color:rgb(17, 26, 148);font-family: 'Amiri', serif;"
          for="password">Password</label><br>
        <input class="password" type="password" placeholder="Password" /><br>
        <button>Login</button>
        <div class="java">
          <p class="forgot"><a href="#">Forgot Password?</p>
          <span>Don't have an account yet?</span>
          <span class="a"><a href="*">Sign Up</span>
        </div>
      </form>
    </body>
    
    </html>`)
  })

  app.use('/auth', authRoute)
  console.log("Route Inilizied")

  app.listen(PORT, () => { console.log(`Server listening port - ${PORT}`) })

})();









