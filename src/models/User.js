import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false,
    },
    phone1: {
        type: String,
        required: true,
    },
    phone2: {
        type: String,
        required: false,
    },
    group: {
        type: Number,
        required: true,
    },
    isSup: {
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
    monthlyReport: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Report'
    },
    role: {
        type: String,
        required: true,
        default: 'Collaborator'
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default model('User', userSchema, 'users');