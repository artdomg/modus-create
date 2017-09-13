const safetyRatingsService = require('../services/safetyRatings');

const emptyResults = {
  Count: 0,
  Results: []
};

module.exports = {
  getVehicles,
  postVehicles
};

function getVehicles(req, res, next) {
  req.vehicleData = {
    modelYear: req.params.modelYear,
    manufacturer: req.params.manufacturer,
    model: req.params.model
  };

  return searchVehicles(req, res, next);
}

function postVehicles(req, res, next) {
  req.vehicleData = {
    modelYear: req.body.modelYear,
    manufacturer: req.body.manufacturer,
    model: req.body.model
  };

  return searchVehicles(req, res, next);
}

function searchVehicles(req, res, next) {
  if (!Number.isInteger(parseInt(req.vehicleData.modelYear))) {
    return res.send(emptyResults);
  }

  return safetyRatingsService.getVehicles(req.vehicleData)
    .then(result => {
      return getRatings({
        Count: result.Count,
        Results: result.Results.map(val => ({
          Description: val.VehicleDescription,
          VehicleId: val.VehicleId
        }))
      }, req.query.withRating)
    })
    .then(result => res.send(result))
    .catch(next);
}

function getRatings(response, withRating) {
  if (!withRating || withRating !== 'true') return Promise.resolve(response);

  const results = response.Results.reduce((acum, val) => {
    acum[val.VehicleId] = val;
    return acum;
  }, {});

  return Promise.all(response.Results.map(val => safetyRatingsService.getVehicleRating({ vehicleId: val.VehicleId })))
    .then(ratings => {
      ratings.forEach(rating => {
        rating.Results.forEach(result => results[result.VehicleId].CrashRating = result.OverallRating);
      });

      return response;
    });
}
