import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './config/db.js'

const connectionString = process.env.ATLAS_URI;
await mongoose.connect(connectionString);
console.log('Connected to mongodb!')

const app = express();
app.use(express.json());

// import and use routes for the three collections
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';

//  routes to specific base paths
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/equipment', equipmentRoutes);


//server root route
app.get('/', (req, res) => {
    res.send('Welcome to the Simple Recipe API');
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));