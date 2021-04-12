import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const Roles = Object.freeze({
    Collaborator: 'collaborator',
    Admin: 'admin',
    SuperAdmin: 'superadmin',
});


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
    role: {
        type: String,
        enum: Object.values(Roles),
        required: true,
        default: Roles.Collaborator
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

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

Object.assign(userSchema.statics, {
    Roles,
});

const User = mongoose.model('User', userSchema, 'users');

export default User;