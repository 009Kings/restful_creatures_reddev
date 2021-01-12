const express = require('express');
const router = express.Router();
const fs = require('fs');
const { route } = require('./prehistoric_creatures');

// Mounted at /dinos

// Index — /dinos
router.get('/', (req, res) => {
    // read the file that stores all my dinos and save in a variable to use later
    let dinos = fs.readFileSync('./dinos.json');
    // Parsing JSON into a JS mutable data structure
    let dinoData = JSON.parse(dinos)
    console.log(dinoData);

    res.render('dinos/index', { dinos: dinoData });
});

// New — /dinos/new
router.get('/new', (req, res) => {
    console.log('------------------- New dino who dis')
    res.render('dinos/new');
})

// Show/details — /dinos/:id
router.get('/:id', (req, res) => {
    // Get the index
    let dinoIndex = req.params.id; // this will be the key/index number of the dino in the dinoData array

    // Get mutable dino data
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); // is an array

    // Find Dino at said index
    let thisDino = dinoData[dinoIndex];

    // if there is no dino at dinoData[dinoIndex]
    if (!thisDino) {
        // show a 404 page (end game)
        res.redirect('/dinos/new');
    } else {
        // Ship it
        res.render('dinos/show', { dino: thisDino });
    }
});

// Edit — GET /dinos/:id/edit/
router.get('/:id/edit', (req, res) => {
    // send the dino info into a client page which is the form for a put route.
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); // is an array
    let thisDino = dinoData[dinoIndex];

    if (!thisDino) {
        // show a 404 page (end game)
        res.redirect('/dinos');
    } else {
        // Ship it
        res.render('dinos/edit', { dino: thisDino, dinoId: dinoIndex });
    }
});

router.put('/:id', (req, res) => {
    res.send(`Editing dino at ${req.params.id}`);
})

// Create — POST /dinos
router.post('/', (req, res) => {
    console.log(req.body);

    // turn dinos.json into a mutable array
    let dinos = fs.readFileSync('./dinos.json');
    dinosJS = JSON.parse(dinos);

    // add new dino from req.body to the array
    dinosJS.push(req.body);

    // Turn dino array into JSON
    let dinoJSON = JSON.stringify(dinosJS);

    // write to dinos.json
    fs.writeFileSync('./dinos.json', dinoJSON);

    res.redirect('/dinos');
})

module.exports = router;