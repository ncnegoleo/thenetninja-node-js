/**
 * Main file of the application.
 * This trigger all controllers and start the server.
 */
var express  =  require('express');
var todoController = require('./controllers/todoController');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen port
const PORT = 3000;
app.listen(PORT);
console.log(`You are listen in port ${PORT}`);