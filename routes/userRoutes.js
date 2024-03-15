const express  =  require('express');
const { signup, addTask, showAllTasks ,login, updateTasks, deleteTasks } = require('../controllers/userController');
const router =  express.Router();

router.post('/signup' , signup);
router.post('/:username/addTask' , addTask);
router.get('/:username/tasks/Alltasks',showAllTasks);
router.post('/login' , login)
router.put('/task/update',updateTasks);
router.delete('/task/deleteTask/:id' ,deleteTasks)

module.exports = router;





