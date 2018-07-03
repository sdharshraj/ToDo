var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.listen(3000, function() {
    console.log("Listening on 3000");
});

todoController(app);