import express from 'express'
import userController from '../controllers/userController.js';

const router = express.Router()

//route for /api/users
router.route('/')
    .get(userController.getUsers)   
    .post(userController.createUser);

// routes for /api/users/:id
router.route('/:id')
    .get(userController.getUserById) // READ
    .delete(userController.deleteUser); // delete a user

export default router;