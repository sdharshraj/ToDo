
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.load();

const dbUser = process.env.dbUser;
const dbPass = process.env.dbUserPass;
const collectionName = process.env.collectionName;
mongoose.connect('mongodb://'+ dbUser + ':' + dbPass + '@ds125041.mlab.com:25041/' + collectionName);

const todoSchema = new mongoose.Schema({
    item : String
});
const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app) {
    app.get('/todo' ,function(req, res){
        Todo.find({}, function(err,data) {
            if(err) throw err;
            res.render('todo', {
                todos: data
            });
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        req.body.item = req.body.item.trim();
        let newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        Todo.find({item: req.params.item.trim().replace(/\-/g," ").trim()}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    });
}