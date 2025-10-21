import Equipment from "../models/Equipment.js";

//all equipment
export const getEquipmentList = async (req, res) => {
  try {
    const equipment = await Equipment.find({});
    res.status(200).json(equipment);
    console.log("All Equipment");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//single equipment by ID
export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.find({});
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create equipment
export const createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    const savedEquipment = await equipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update equipment

export const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete equipment
export const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res
      .status(200)
      .json({ message: `Equipment ${req.params.id} successfully deleted.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
