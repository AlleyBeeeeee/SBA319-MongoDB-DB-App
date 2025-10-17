import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true},
  quanity: { type: String, required: true },
  _id: false
});

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: transpileModule,
    },
    description: { type: String, required: true},

    prepTime: {
        type: Number,
        required: true,
        min: 1,
    },
    cookTime: {
        type: Number,
        required: true,
        min: 1,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    ingredients: {
        type: [ingredientSchema],
        required: true,
        validate: [v => v.length > 0, 'A recipe must have at least one ingredient.'],
    },
    equipmentNeeded: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment',
            required: true,
        },
    ],
    steps: {
        type: [String],
        required: true,
        validate: [v => v.length > 0, 'A recipe must have at least one step.']
    },
});

recipeSchema.index({ title: 'text' });

export default mongoose.model('recipe', recipeSchema);