const {Router} = require("express");
const router = Router();
const {getHabitos, postHabitos, deleteHabitos} = require("../controladores/habitos");

router.get('/',getHabitos);
router.post('/',postHabitos);
router.delete('/:id',deleteHabitos);

module.exports = router;