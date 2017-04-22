/**
 * This controller work with all requests and responses
 * to To-do pages.
 *
 * @param app - get the object app (express) to control
 * the requests and responses.
 */

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:1234@ds115411.mlab.com:15411/todo');

// Create a Schema - this like a blueprint
var todoSchema = new mongoose.Schema({
   item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlecondedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        // get data from the mongodb and pass to the view
        Todo.find({}, function (err, data) {
            if(err) throw err;
            res.render('todo', {todos: data});
        })
    });

    app.post('/todo', urlecondedParser, function (req, res) {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if(err) throw err;
            res.json(data);
        });
        //data.push(req.body);
    });

    app.delete('/todo/:item', function (req, res) {
        // delete the item from the mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
            if(err) throw err;
            res.json(data);
        })
        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // })
    });
};