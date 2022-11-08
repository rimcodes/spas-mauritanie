const { Facture } = require('../models/facture');
const express = require('express');
const router = express.Router();


// get request for all factures in the db
router.get('/', async (req, res) => {
    try {
        const factures = await Facture.find().populate('user', 'name email compt address chifer code notes');
        res.status(200).send(factures);
        
    } catch (error) {
        res.status(500).json({ success: false});
    }
});

// Get facture using the user id
router.get('/users/:user', async (req, res) => {
    try {
        const factures = await Facture.find( { user: req.params.user }).populate('user', 'name email compt addres chifer code notes');
        res.status(200).send(factures);
        
    } catch (error) {
        res.status(500).json({ sucess: false});
        
    }

});


// get request for single facture based on id parameter in the url
router.get('/:id', async(req, res) => {
    try {
        const facture = await Facture.findById(req.params.id).populate('user', 'name email compt address chifer code notes');
        res.status(200).send(facture);
        
    } catch (error) {
        res.status(500).json({ message: 'The facture with the given ID was not  found.'})
        
    }
    
});

// creating a facture and adding it to the db
router.post('/', async (req, res) => {
    try {
        let facture = new Facture({
            name: req.body.name,
            type: req.body.type,
            month: req.body.month,
            user: req.body.user,
            created_at: Date.now(),
        })
        facture = await facture.save();
        res.send(facture);
        
    } catch (error) {
        return res.status(404).send('The facture could not be created!');
        
    }

});

// updating a specific facture 
router.put('/:id', async (req, res) => {
    try {
        const facture = await Facture.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name,
                type: req.body.type,
                month: req.body.month,
                user: req.body.user,
                updated_at: Date.now()
            },
            { new: true }
        );
        res.status(200).send(facture);
    } catch (error) {
        return res.status(400).send('the facture cannot be updated');
        
    }

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

// Getting availble months 
router.get('/months/users', async (req, res) => {
    let filters = {};
    try {
        const query = Facture.find();
        if (req.query.month & !req.query.user) {
            // filters = { month: req.query.month, user: req.query.user }
            query.find({ month: req.query.month }).populate('user', 'name email compt addres code ');
        }
        if (req.query.user && !req.query.month) {
            query.find({ user: req.query.user }).populate('user', 'name email compt addres code ');
        }
        if (req.query.month && req.query.user) {
            query.find({ month: req.query.month, user: req.query.user }).populate('user', 'name email compt addres code ');
        }
        if(req.query.maxmonth && req.query.minmonth) {
            query.find({ month: { $lte: req.query.maxmonth, $gte: req.query.minmonth } }).populate('user', 'name email compt addres code ');
        }
        if (req.query.minmonth && !req.query.maxmonth) {
            query.find({ month: { $gte: req.query.minmonth } }).populate('user', 'name email compt addres code ');
            
        }
        if(req.query.maxmonth && !req.query.minmonth) {
            query.find({ month: { $lte: req.query.maxmonth } }).populate('user', 'name email compt addres code ');
        }
        // const factures = await Facture.find(filters).populate('user', 'name email compt addres code ');
        query.getFilter();
        const factures = await query.exec();
        res.status(200).send(factures);
    } catch (error) {
        res.status(500).json({ sucess: false, message: error});
        
    }

});

// Getting availble months 
router.get('/months/:user', async (req, res) => {
    let activeMonths = [];
    try {
        const factures = await Facture.find({ user: req.params.user});
        
        factures.forEach((fac) => {
            activeMonths.push(fac.month);
        })
        res.status(200).send(activeMonths);
    } catch (error) {
        res.status(500).json({ sucess: false, message: error});
        
    }

})

module.exports = router;