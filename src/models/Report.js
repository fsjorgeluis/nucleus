import { Schema, model } from 'mongoose';

const reportSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    publisher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Publisher'
    },
    hour: {
        type: Number,
        required: true,
        default: 0
    },
    publication: {
        type: Number,
        required: true,
        default: 0
    },
    revisit: {
        type: Number,
        required: true,
        default: 0
    },
    study: {
        type: Number,
        required: true,
        default: 0
    },
    note: {
        type: String,
        required: false
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model('Report', reportSchema, 'reports');