const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://db:27017/todo', { useNewUrlParser: true });

const STATUS_ACTIVE = 1;
const STATUS_ACHIVED = 0;

const Board = mongoose.model('Board', {
    name: String,
    project_id: String,
    status: Number,
    tags: [String]
});

app.get('/', (req, res) => {
    Board.find().then(boards => {
        res.send(boards);
    });
});

app.post('/', (req, res) => {
    const board = new Board({
        name: req.body.name,
        project_id: req.body.project_id,
        status: STATUS_ACTIVE,
        tags: []
    });

    board.save()
        .then(() => {
            res.sendStatus(201).send(board);
        })
        .catch(() => {
            res.sendStatus(500).send({ created: false });
        });
});

app.get('/:id', (req, res) => {
    Board.findById(req.params.id)
        .then(board => res.send(board))
        .catch(() => {
            res.sendStatus(404).send({ found: false });
        });
});

app.put('/:id', (req, res) => {
    Board.findByIdAndUpdate(req.params.id, { 
        name: res.body.name,
        status: req.body.status,
        tags: req.body.status,
    })
    .then(board => {
        res.send(board);
    })
    .catch(() => {
        res.sendStatus(500).send({ updated: false });
    });
});

app.delete('/:id', (req, res) => {
    Board.findByIdAndDelete(req.params.id)
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
