const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
            index: true,
            required: true
        },
        password: {
            type: String,
            default: null,
            index: true,
        },
        mobile: {
            type: Number,
            required: true,
            index: true
        },
        token: {
            type: String
        },
        is_deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Member_Model = mongoose.model('mentors', MemberSchema)
module.exports = Member_Model
