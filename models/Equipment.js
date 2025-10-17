import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Index
    trim: true,
  },

  category: {
    type: String,
    enum: ['Large Appliance', 'Small Appliance', 'Bakeware', 'Cookware', 'Utensil', 'Misc'], 
    default: 'Misc',
    required: true,
  },
  needsElectricity: {
    type: Boolean,
    default: false,
  },

  sizeDetails: {
    value: { type: Number, min: 1 }, 
    unit: { 
      type: String, 
      trim: true 
    },
    _id: false 
  },
  isEssential: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Equipment', equipmentSchema);
