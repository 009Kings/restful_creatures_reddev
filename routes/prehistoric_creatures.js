
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Mounted at /prehistoric_creatures
let historics = fs.readFileSync('./prehistoric_creatures.json');
let histData = JSON.parse(historics);

// Index - /prehistoric_creatures
router.get('/', (req, res) => {
    res.render('historics/index', { historics: histData })
});
// New - prehistoric_creatures/new
router.get('/new', (req, res) => {
    res.render('historics/new');
});
// Get 1 - /prehistoric_creatures/1
router.get('/:id', (req, res) => {
    let index = req.params.id;
    res.render('historics/show', { historic: histData[index] });
});
// Post - prehistoric_creatures
router.post('/', (req, res) => {
    histData.push(req.body);
    let histJson = JSON.stringify(histData);
    fs.writeFileSync('./prehistoric_creatures.json', histJson);
    res.redirect('/prehistoric_creatures');
});

module.exports = router;