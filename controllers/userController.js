import User from '../models/User.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-recipes');
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate()
    }
}