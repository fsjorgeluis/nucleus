import mongoose, { Schema } from 'mongoose';

const groupSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    member: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Publisher'
        }
    ],
    status: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Group = mongoose.model('Group', groupSchema, 'groups');

export default Group;