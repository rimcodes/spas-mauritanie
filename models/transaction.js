const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    truckNumber: {
        type: String
    },
    conducteur: {
        type: String
    },
    date: {
        type: String,
    },
    destination: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    facture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facture',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    prixUnitaire: {
        type: String
    },
    nature: {
        type: String,
    },
    // delivery: {
    //     type: String
    // },
    payment: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

transactionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

transactionSchema.set('toJSON', {
    virtuals: true
});

exports.Transaction = mongoose.model('Transaction', transactionSchema);
exports.transactionSchema = transactionSchema;
