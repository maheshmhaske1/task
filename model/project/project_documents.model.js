const mongoose = require('mongoose')

const Project_Doc_Schema = new mongoose.Schema(
    {
        project_id: {
            type: mongoose.Types.ObjectId
        },
        document_name: {
            type: String
        },
        document_url: {
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

const Project_Doc_Model = mongoose.model('project_docs', Project_Doc_Schema)
module.exports = Project_Doc_Model
