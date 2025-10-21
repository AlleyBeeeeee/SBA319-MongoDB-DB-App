
import express from 'express';
import recipeController from '../controllers/recipeController.js'; 

const router = express.Router();

// routes for /api/recipes
router.route('/')
    .get(recipeController.getRecipes)    
    .post(recipeController.createRecipe); 

// routes for /api/recipes/:id
router.route('/:id')
    .get(recipeController.getRecipeById)  
    .patch(recipeController.updateRecipe) 
    .delete(recipeController.deleteRecipe); 

export default router;