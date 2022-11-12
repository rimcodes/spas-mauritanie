const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');
        res.send(userList);
        
    } catch (error) {
        res.status(500).json({ success: false });
        
    }

});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        res.status(200).send(user);
        
    } catch (error) {
        res.status(500).json({ message: 'The User with the given ID was not  found.'});
        
    }

});

router.post(`/`, async (req, res) => {

    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            code: req.body.code,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            address: req.body.address,
            bank: req.body.bank,
            compt: req.body.zip,
            notes: req.body.notes,
            chifer: req.body.chifer
        });
        
        user = await user.save();
        res.send(user);
        
    } catch (error) {
    return res.status(500).send({message: 'The user cannot be created', error: error});
    
    }
} );

router.put('/:id', async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        let newPassword;
        if (req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password, 10)
        } else {
            newPassword = userExist.passwordHash;
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name,
                email: req.body.email,
                code: req.body.code,
                passwordHash: newPassword,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin,
                address: req.body.address,
                bank: req.body.bank,
                compt: req.body.compt,
                notes: req.body.notes,
                chifer: req.body.chifer
            },
            { new: true }
        );

        res.status(200).send(user);
    } catch (error) {
        return res.status(400).send('the user cannot be updated');
        
    }

});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ code: req.body.code });
        let secret = process.env.secret;
        
        if (user && bcrypt.compareSync( req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: '1d' }
            );
            res.status(200).send({
                user: user.code,
                id: user.id,
                token: token
            });
        } else {
            res.status(401).send(' Pass was wrong!');
        }
    } catch (error) {
        res.status(400).send('The user was not found!');
        
    }
    

});

router.post(`/register`, async (req, res) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        code: req.body.code,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        address: req.body.address,
        bank: req.body.bank,
        compt: req.body.compt
    });

    user = await user.save();

    if(!user)
    return res.status(500).send('The product cannot be created');

    res.send(user);
});

// // Update the user chifer field
// router.put('/chifer/:id', async (req, res) => {

// });

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then( (user) => {
        if(user) {
            return res.status(200).json({ success: true, message: 'the product was deleted.'})
        } else {
            return res.status(404).json.apply({success: false, message: "product not found"})
        }
    }).catch( err => {
        return res.status(400).json({success: false, error: err });
    });

});

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        res.status(500).json({success: false});
    }
    res.send({
        "userCount": userCount
    });
});

module.exports = router;
