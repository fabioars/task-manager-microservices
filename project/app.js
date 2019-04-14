const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://db:27017/todo', { useNewUrlParser: true });

const Project = mongoose.model('Project', { name: String });

app.get('/', (req, res) => {
    Project.find().then(projects => {
        res.send(projects);
    });
});

app.post('/', (req, res) => {
    const project = new Project({
        name: req.body.name
    })

    project.save()
        .then(() => {
            res.send(project);
        })
        .catch(() => {
            res.sendStatus(500).send({ created: false });
        });
});


app.get('/project/:id', (req, res) => {
    Project.find({ "project_id": req.params.id })
        .then(project => res.send(project))
        .catch(() => {
            res.sendStatus(404).send({ found: false });
        });
});

app.put('/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, { name: res.body.name })
        .then(project => {
            res.send(project);
        })
        .catch(() => {
            res.sendStatus(500).send({ updated: false });
        });
});

app.delete('/:id', (req, res) => {
    Project.findByIdAndDelete(req.params.id)
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
