const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();
const authController = require('./../controllers/authController');

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours) /*o primeiro middleware serve para proteger os conteudos das paginas que devem ser apresentadas */
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),/*essa acao vai ser restringido para apenas esses usuários, chama-se "user-role" */
    tourController.deleteTour
  );
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
module.exports = router;
