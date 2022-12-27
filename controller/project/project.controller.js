const project = require('../../model/project/projects.model')
const project_requirements = require('../../model/project/project_requirenment.model')
const project_documents = require('../../model/project/project_documents.model')
const { default: mongoose } = require('mongoose')


exports.add_project = async (req, res) => {
    const { mentor_id, project_name, start_date, end_date, members, technology } = req.body
    await new project({
        mentor_id: mentor_id,
        project_name: project_name,
        start_date: start_date,
        end_date: end_date,
        members: members,
        technology: technology
    })
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project details added',
                data: success

            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}

exports.get_projectsBy_employee = async (req, res) => {
    const { employee_id } = req.params
    // await project.find({ mentor_id: mongoose.Types.ObjectId })
    await project.aggregate([
        {
            $match: { members: { $in: [mongoose.Types.ObjectId(employee_id)] } }
        },
        {
            $lookup: {
                from: "project_requirements",
                let: { project_id: "$project_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $and:
                                [
                                    { $expr: { $eq: ["$_id", "$$project_id"] } },
                                    { $expr: { $ne: ["$is_delete", true] } }
                                ]
                        }
                    }
                ],
                as: "project_requirements"
            }
        },
        {
            $unwind: {
                path: "$project_requirements",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "project_docs",
                let: { project_id: "$project_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $and:
                                [
                                    { $expr: { $eq: ["$_id", "$$project_id"] } },
                                    { $expr: { $ne: ["$is_delete", true] } }

                                ]
                        }
                    }
                ],
                as: "project_docs"
            }
        },
        {
            $unwind: {
                path: "$project_docs",
                preserveNullAndEmptyArrays: true
            }
        }
    ])
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project details',
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}


exports.get_projects = async (req, res) => {
    const { mentor_id } = req.params
    // await project.find({ mentor_id: mongoose.Types.ObjectId })
    await project.aggregate([
        {
            $match: { mentor_id: mongoose.Types.ObjectId(mentor_id) }
        },
        {
            $lookup: {
                from: "project_requirements",
                let: { project_id: "$project_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $and:
                                [
                                    { $expr: { $eq: ["$_id", "$$project_id"] } },
                                    { $expr: { $ne: ["$is_delete", true] } }
                                ]
                        }
                    }
                ],
                as: "project_requirements"
            }
        },
        {
            $unwind: {
                path: "$project_requirements",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "project_docs",
                let: { project_id: "$project_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $and:
                                [
                                    { $expr: { $eq: ["$_id", "$$project_id"] } },
                                    { $expr: { $ne: ["$is_delete", true] } }

                                ]
                        }
                    }
                ],
                as: "project_docs"
            }
        },
        {
            $unwind: {
                path: "$project_docs",
                preserveNullAndEmptyArrays: true
            }
        }
    ])
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project details',
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}



exports.add_project_requirements = async (req, res) => {
    const { project_id, requirement_name, requirement_timeline } = req.body
    await new project_requirements({
        project_id: project_id,
        requirement_name: requirement_name,
        requirement_timeline: requirement_timeline
    })
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project requirements added',
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}

exports.list_project_requirements = async (req, res) => {
    const { project_id } = req.params
    await project_requirements.find({ project_id: mongoose.Types.ObjectId(project_id), is_deleted: true })
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project requirements added',
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}

exports.edit_project_requirements = async (req, res) => {
    const { id } = req.params
    const update_data = req.body

    await project_requirements.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id), is_deleted: true },
        {
            $set: update_data
        },
        { returnOriginal: false })
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project requirements updated',
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}


exports.delete_project_requirements = async (req, res) => {
    const { id } = req.params

    await project_requirements.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id), is_deleted: true },
        {
            $set: {
                is_deleted: true
            }
        })
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project requirements deleted',
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}


exports.add_project_documents = async (req, res) => {
    const { project_id, document_name, document_url } = req.body
    await new project_documents({
        project_id: project_id,
        document_name: document_name,
        document_url: document_url
    })
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project document added',
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}

exports.list_project_document = async (req, res) => {
    const { project_id } = req.params
    await project_documents.find({ project_id: mongoose.Types.ObjectId(project_id), is_deleted: true })
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project requirements added',
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}

exports.edit_project_document = async (req, res) => {
    const { id } = req.params
    const update_data = req.body

    await project_documents.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id), is_deleted: true },
        {
            $set: update_data
        },
        {
            returnOriginal: false
        })
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project document updated',
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}


exports.delete_project_docs = async (req, res) => {
    const { id } = req.params

    await project_documents.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id), is_deleted: true },
        {
            $set: {
                is_deleted: true
            }
        })
        .then((success) => {
            return res.json({
                status: true,
                message: 'Project document deleted',
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}


