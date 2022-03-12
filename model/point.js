const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* defining points Schema */
const pointDetails = new Schema({
    name: {
        type: String
    },
    typepoint: {
        type: String
    },
    value: {
        type: String
    },

});

module.exports = mongoose.model('point_details', pointDetails);