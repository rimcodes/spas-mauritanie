const mongoose = require('mongoose');

const transactionLTASchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poids: {
        type: String
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
    nature: {
        type: Number,
        required: true,
    },
    delivery: {
        type: String
    },
    payment: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

transactionLTASchema.virtual('id').get(function () {
    return this._id.toHexString();
});

transactionLTASchema.set('toJSON', {
    virtuals: true
});

exports.TransactionLTA = mongoose.model('TransactionLTA', transactionLTASchema);
exports.transactionLTASchema = transactionLTASchema;
