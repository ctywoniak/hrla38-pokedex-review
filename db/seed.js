const pokemon = require('../pokemon.json');
const db = require('./db.js')

pokemon.forEach((mon) => {
    db.query(`INSERT INTO pokemon (name, type, img) VALUES ("${mon.name}", "${mon.type}", "${mon.img}")`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('seeded');
        }
    })
})