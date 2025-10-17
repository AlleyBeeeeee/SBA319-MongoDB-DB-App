import express from 'express'
import as userController from '../controllers/userController.js';

const router = express.Router()length

//route for /api/users
router.route('/')
    .get(userController.getUsers)   
    .post(userController.createUser);

// Routes for /api/users/:id
router.route('/:id')
    .get(userController.getUserById) // READ: Get a single user by ID
    // Note: No PATCH/PUT for users in this simple version, but DELETE is included.
    .delete(userController.deleteUser); // DELETE: Delete a user

export default router;