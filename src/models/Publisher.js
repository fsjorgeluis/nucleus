import mongoose from 'mongoose';

const publisherSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false,
        default: 'PLC, Venezuela'
    },
    phone1: {
        type: String,
        required: true,
    },
    phone2: {
        type: String,
        required: false,
        default: '+580000000000'
    },
    group: {
        type: Number,
        required: true,
    },
    isGroupSupervisor: {
        type: Boolean,
        required: true,
        default: false
    },
    isGroupAssistant: {
        type: Boolean,
        required: true,
        default: false
    },
    isAux: {
        type: Boolean,
        required: true,
        default: false
    },
    isPr: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Publisher = mongoose.model('Publisher', publisherSchema, 'publishers');

export default Publisher;