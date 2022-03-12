const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* defining dataPoints Schema */
const dataPointDetails = new Schema({
    name: {
        type: String
    },
    typepoint: {
        type: String
    },
    value: {
        type: String
    },
    timestamp:{
        type: String
    },

});

module.exports = mongoose.model('dataPoint_details', dataPointDetails);