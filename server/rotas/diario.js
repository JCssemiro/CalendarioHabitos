const {Router} = require("express");
const router = Router();
const {getDiario, postDiario, getDiarioPorData} = require('../controladores/diario');

router.get('/',getDiario);
router.get('/:dia&:mes&:ano',getDiarioPorData);
router.post('/',postDiario);

module.exports = router;