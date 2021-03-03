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
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hour: {
        type: Number,
        required: true
    },
    publication: {
        type: Number,
        required: true
    },
    revisit: {
        type: Number,
        required: true
    },
    study: {
        type: Number,
        required: true
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