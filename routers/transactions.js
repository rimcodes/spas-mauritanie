const { Transaction } = require('../models/transaction');
const { Facture } = require('../models/facture');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// get the transactions with the option to limiting the catagories
router.get(`/`, async (req, res) => {

    let transactionList;
    let filter = {};
    if(req.query.factures) {
        filter = { facture: req.query.factures.split(',') };
    }
    try {
        // transactionList = await Transaction.find(filter).populate('facture').populate({ path: 'facture.user', model: 'User'});
        transactionList = await Transaction.find(filter).populate({
            path: 'facture',
            populate: {
                path: 'user',
                select: 'name email compt addres code chifer'
            }
        });
        
    } catch (error) {
        console.log("Erro loged in the console: ", error);
        res.status(500).json({success: false});
    }

    res.send(transactionList);
} );

// get the transaction with the specified id 
router.get(`/:id`, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate({
            path: 'facture',
            populate: {
                path: 'user',
                select: 'name email compt addres code chifer'
            }
        });
        res.send(transaction);
        
    } catch (error) {
        res.status(500).json({success: false, message: 'There is no transaction with the given id'});
        
    }

} );

// get the transaction with the specified id 
router.get(`/factures/:facture`, async (req, res) => {
    
    try {
        const transaction = await Transaction.find({ facture: req.params.facture }).populate({
            path: 'facture',
            populate: {
                path: 'user',
                select: 'name email compt addres code chifer'
            }
        });
        res.send(transaction);
       
    } catch (error) {
        res.status(500).json({success: false, message: 'There is no transaction with the given id'});
        
    }
    
} );

// posting transactions to the database 
router.post(`/`, async (req, res) => {
    try {
        // Making sure the facture exists
        const facture = await Facture.findById(req.body.facture);
        if(!facture) return res.status(400).send('Invalid Facture');
    
        let transaction = new Transaction({
            name: req.body.name,
            truckNumber: req.body.truckNumber,
            conducteur: req.body.conducteur,
            date: req.body.date,
            destination: req.body.destination,
            nature: req.body.nature,
            price: req.body.price,
            facture: req.body.facture,
            quantity: req.body.quantity,
            prixUnitaire: req.body.prixUnitaire,
            payment: req.body.payment,
        });
    
        transaction = await transaction.save();
        res.send(transaction);
        
    } catch (error) {
        return res.status(500).send('The transaction cannot be created ');
        
    }

} );

// updating a specific transaction
router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid transaction id');
    }
    try {
        const facture = await Facture.findById(req.body.facture);
        const transaction = await Transaction.findById(req.params.id);
        
        if(!transaction) return res.status(400).send('Invalid transaction ');
        if(!facture) return res.status(400).send('Invalid facture ');

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name,
                truckNumber: req.body.truckNumber,
                conducteur: req.body.conducteur,
                date: req.body.date,
                destination: req.body.destination,
                nature: req.body.nature,
                price: req.body.price,
                facture: req.body.facture,
                quantity: req.body.quantity,
                prixUnitaire: req.body.prixUnitaire,
                payment: req.body.payment,
                updated_at: Date.now()
            },
            { new: true }
        );
        res.status(200).send(updatedTransaction);

    } catch (error) {
        return res.status(500).send('the transaction cannot be updated');
        
    }


});

router.delete('/:id', (req, res) => {
    
    Transaction.findByIdAndRemove(req.params.id).then(transaction => {
        if(transaction) {
            return res.status(200).json({ success: true, message: 'the transaction was deleted.'})
        } else {
            return res.status(404).json.apply({success: false, message: "transaction not found"})
        }
    }).catch( err => {
        return res.status(400).json({success: false, error: err });
    });

});

// getting the transaction count 
router.get('/get/count', async (req, res) => {
    const transactionCount = await Transaction.countDocuments();

    if (!transactionCount) {
        res.status(500).json({success: false});
    }
    res.send({
        transactionCount: transactionCount
    });
});

// getting the featured transactions
router.get('/payed/:count', async (req, res) => {
    let count = req.params.count ? +req.params.count : 0;

    const transactions = await Transaction.find( { payment: true } ).limit(count);

    if (!transactions) {
        res.status(500).json({success: false});
    }
    res.send(transactions);
});


module.exports = router;
