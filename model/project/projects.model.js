const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
    {
        mentor_id: {
            type: mongoose.Types.ObjectId
        },
        project_name: {
            type: String,
            required: true
        },
        start_date: {
            type: Date,
            required: true
        },
        members: [mongoose.Types.ObjectId],
        technology: [mongoose.Types.ObjectId],
        is_deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const project_Model = mongoose.model('projects', ProjectSchema)
module.exports = project_Model
