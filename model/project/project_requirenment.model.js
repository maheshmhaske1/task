const mongoose = require('mongoose')

const Project_Requirement_Schema = new mongoose.Schema(
    {
        project_id: {
            type: mongoose.Types.ObjectId
        },
        requirement_name: {
            type: String
        },
        requirement_timeline: {
            type: Date
        },
        is_completed: {
            type: Boolean,
            default: false
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

const Project_Requirement_Model = mongoose.model('project_requirements', Project_Requirement_Schema)
module.exports = Project_Requirement_Model
