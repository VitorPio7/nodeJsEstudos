const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();/*criacao de um middleware personalizado */


router.param('id',tourController.chekID);/*esse é um middleware onde vai ser usada essa funcao para 
verificar id */
router
.route('/')
.get(tourController.getTours)
.post(tourController.checkBody,tourController.postTours);/*essa é uma versão simplificada do codigo acima */
router
.route('/:id')
.get(tourController.getToursById)
.patch(tourController.patchTours)
.delete(tourController.deleteTours);

module.exports = router;