const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://db:27017/todo', { useNewUrlParser: true });

const PRIORITY_COOL = 0
const PRIORITY_URGENT = 1

const Task = mongoose.model('Task', { 
    name: String,
    priority: Number,
    board_id: String,
    tags: [String]
});

app.get('/', (req, res) => {
    Task.find().then(tasks => {
        res.send(tasks);
    });
});

app.post('/', (req, res) => {
    const tasks = new Task({
        name: req.body.name,
        board_id: req.body.board_id,
        priority: res.body.priority || PRIORITY_COOL,
        tags: []
    });

    tasks.save()
        .then(() => {
            res.send(tasks);
        })
        .catch(() => {
            res.sendStatus(500).send({ created: false });
        });
});


app.get('/board/:id', (req, res) => {
    Task.find({ 'board_id': req.params.id })
        .then(task => res.send(task))
        .catch(() => {
            res.sendStatus(404).send({ found: false });
        });
});

app.put('/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { 
        name: res.body.name,
        board_id: res.body.board_id,
        priority: res.body.priority,
        tags: res.body.tags,
    })
    .then(task => {
        res.send(task);
    })
    .catch(() => {
        res.sendStatus(500).send({ updated: false });
    });
});

app.delete('/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({ deleted: true });
        })
        .catch(() => {
            res.sendStatus(500).send({ deleted: false });
        });
});

app.listen(5000, () => {
    console.log('Listening in 5000');
});
