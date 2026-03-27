const mongoose = require('mongoose');

const infoTraficSchema = new mongoose.Schema({
    localisation: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        enum: ['normal', 'embouteillage', 'accident'],
        default: 'normal'
    },
});

const InfoTrafic = mongoose.model('InfoTrafic', infoTraficSchema);

module.exports = InfoTrafic;
