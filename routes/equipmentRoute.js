import express from 'express'

const router = express.Router();

router.route('/')
    .get(equipmentController.getEquipmentList)
    .post(equipmentController.createEquipment);


router.route(':/id')
.get(equipmentController.getEquipmentById)
.patch(equipmentController.getEquipmentById)
.delete(equipmentController.deleteEquipment);

export default router;