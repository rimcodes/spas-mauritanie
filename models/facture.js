const mongoose = require('mongoose');

const factureSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    number: {
        type: String
    },
    recite: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

factureSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

factureSchema.set('toJSON', {
    virtuals: true
});

exports.Facture = mongoose.model('Facture', factureSchema);
exports.factureSchema = factureSchema;
