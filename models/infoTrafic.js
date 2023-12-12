// models/infoTrafic.js
const mongoose = require('mongoose');

const traficSchema = new mongoose.Schema({
  state: { type: String, required: true },
});

const Trafic = mongoose.model('Trafic', traficSchema);

module.exports = Trafic;
