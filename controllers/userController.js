import User from '../models/User.js'

//get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-recipes');
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: error.message});
    }
};

//get single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('recipes', 'title'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//     CREATE a new user
//    POST /api/users
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) { 
        res.status(400).json({ message: 'Failed to create user', error: error.message });
       
    }
};

//delete user 
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // remove the recipes owned by user
        res.status(200).json({ message: `User ${req.params.id} successfully deleted.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};