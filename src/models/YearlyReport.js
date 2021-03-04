import { Schema, model } from 'mongoose';

const yearlyReportSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    monthlyReport: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Report'
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default model('YearlyReport', yearlyReportSchema, 'yearlyReports');