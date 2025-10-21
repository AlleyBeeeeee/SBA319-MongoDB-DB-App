
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

// GET all recipes
//GET /api/recipes
export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({})
            .populate('owner', 'username')
            .select('title prepTime cookTime'); 
        
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single recipe by ID
//GET /api/recipes/:id
export const getRecipeById = async (req, res) => {
    try {
        // Populate both the owner and the list of equipment
        const recipe = await Recipe.findById(req.params.id)
            .populate('owner', 'username')
            .populate('equipmentNeeded', 'name category sizeDetails'); 

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//CREATE a new recipe
//POST /api/recipes
export const createRecipe = async (req, res) => {
    const { owner } = req.body;
    
    try {
        const recipe = new Recipe(req.body);
        const createdRecipe = await recipe.save();

       
        await User.findByIdAndUpdate(owner, { $push: { recipes: createdRecipe._id } });

        res.status(201).json(createdRecipe);

    } catch (error) {
        res.status(400).json({ message: 'Invalid recipe data', error: error.message });
    }
};

// UPDATE a recipe
//PATCH /api/recipes/:id
export const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  DELETE a recipe
//  DELETE /api/recipes/:id
export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not fuond' });
        }

        // modeling: remove recipe ID
        await User.findByIdAndUpdate(recipe.owner, {
            $pull: { recipes: recipe._id }
        });

        res.status(200).json({ message: `Recipe ${req.params.id} successfully deleted.` });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};