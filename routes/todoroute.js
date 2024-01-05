const {Router} = require("express");
const { getToDo, saveToDo, updateToDo, deleteToDo } = require("../controllers/todocontroller");
const { protect} = require("../controllers/authController");
const router = Router();

router.route('/').get(protect,getToDo)
router.post('/save', protect,saveToDo);
router.post('/update', protect,updateToDo);
router.post('/delete', protect,deleteToDo);

module.exports = router;