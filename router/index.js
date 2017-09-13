const router = require('express').Router();
const vehiclesController = require('../controllers/vehicles');

router.get('/vehicles/:modelYear/:manufacturer/:model', vehiclesController.getVehicles);
router.post('/vehicles', vehiclesController.postVehicles);

module.exports = router;
