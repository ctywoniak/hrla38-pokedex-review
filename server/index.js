const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const router = express.Router();
const port = 5150;
const db = require('../db/db.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router);

router.get('/', (req, res) => {
    db.query(`SELECT * FROM pokemon`, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

router.post('/', (req, res) => {
    db.query(`INSERT INTO pokemon (name, type, img) VALUES ("${req.body.name}", "${req.body.type}", "${req.body.img}")`, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(result)
        }
    })
})

router.get('/type', (req, res) => {
    db.query(`SELECT * FROM pokemon WHERE type = "${req.body.type}"`, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

router.put('/:id', (req, res) => {
    db.query(`UPDATE pokemon SET name="${req.body.name}" where id=${req.params.id}`, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

router.delete('/:id', (req, res) => {
    db.query(`DELETE FROM pokemon WHERE id=${req.params.id}`, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))