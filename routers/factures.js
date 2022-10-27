const { Facture } = require('../models/facture');
const express = require('express');
const router = express.Router();


// get request for all factures in the db
router.get('/', async (req, res) => {
    const factures = await Facture.find().populate('user', 'name email compt address');

    if(!factures) {
        res.status(500).json({ success: false});
    };

    res.status(200).send(factures);
});

// Get facture using the user id
router.get('/users/:user', async (req, res) => {
    const factures = await Facture.find( { user: req.params.user }).populate('user', 'name email compt addres');

    if(!factures) {
        res.status(500).json({ sucess: false});
    };

    res.status(200).send(factures);
});


// get request for single facture based on id parameter in the url
router.get('/:id', async(req, res) => {
    const facture = await Facture.findById(req.params.id).populate('user', 'name email compt address');

    if(!facture) {
        res.status(500).json({ message: 'The facture with the given ID was not  found.'})
    }
    res.status(200).send(facture);
});

// creating a facture and adding it to the db
router.post('/', async (req, res) => {
    let facture = new Facture({
        name: req.body.name,
        user: req.body.user,
        number: req.body.number,
        recite: req.body.recite,
    })
    facture = await facture.save();

    if(!facture){
        return res.status(404).send('The facture could not be created!');
    };

    res.send(facture);
});

// updating a specific facture 
router.put('/:id', async (req, res) => {
    const facture = await Facture.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name,
            user: req.body.user,
            number: req.body.number,
            recite: req.body.recite,
            updated_at: Date.now()
        },
        { new: true }
    );

    if(!facture) {
        return res.status(400).send('the facture cannot be updated');
    }

    res.status(200).send(facture);
});

// deleting a specific facture
router.delete('/:id', (req, res) => {
    Facture.findByIdAndRemove(req.params.id).then(facture => {
        if(facture) {
            return res.status(200).json({ success: true, message: 'the facture was deleted.'})
        } else {
            return res.status(404).json.apply({success: false, message: "facture not found"})
        }
    }).catch( err => {
        return res.status(400).json({success: false, error: err });
    });

});

module.exports = router;