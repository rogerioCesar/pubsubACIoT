const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* defining policies Schema */
const policyDetails = new Schema({
    name: {
        type: String
    },
    temperature: {
        type: String
    },
    hour: {
        type: String
    },
    day: {
        type: String
    },
    point: {
        type: String
    },
    role: {
        type: String
    },	
	localization: {
        type: String
    },
    age: {
        type: String
    },
    connectivity: {
        type: String
    },
    battery: {
        type: String
    },
    device: {
        type: String
    }
});

module.exports = mongoose.model('policy_details', policyDetails);