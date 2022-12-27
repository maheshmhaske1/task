const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
            index: true,
            required: true
        },
        gender: {
            type: String,
            default: null,
            index: true
        },
        city: {
            type: String,
            default: false,
            index: true
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
        age: {
            type: Number,
            index: true,
            required: true,
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

const Employee_Model = mongoose.model('employees', EmployeeSchema)
module.exports = Employee_Model
