const express = require('express')
const router = express.Router()

const project = require('../../controller/project/project.controller')

router.post('/add', project.add_project)
router.post('/get/:mentor_id', project.get_projects)
router.post('/get/:employee_id', project.get_projectsBy_employee)

router.post('/add_requirement', project.add_project_requirements)
router.get('list_requirement/:project_id', project.list_project_requirements)
router.put('edit_requirement/:id', project.edit_project_requirements)
router.delete('delete_requirement/:id', project.delete_project_requirements)

router.post('/add_doc', project.add_project_documents)
router.get('list_doc/:project_id', project.list_project_document)
router.put('edit_doc/:id', project.edit_project_document)
router.delete('delete_dic/:id', project.delete_project_docs)

module.exports = router