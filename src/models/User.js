import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: false,
        default: () => 'User_' + Math.random().toString(36).slice(2)
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
    monthlyReport: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Report'
    }],
    role: {
        type: String,
        required: true,
        default: 'COLLABORATOR'
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

const User = mongoose.model('User', userSchema, 'users');

export default User;