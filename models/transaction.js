const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
    quantity: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        default: 0
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

transactionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

transactionSchema.set('toJSON', {
    virtuals: true
});

exports.Transaction = mongoose.model('Transaction', transactionSchema);
exports.transactionSchema = transactionSchema;
