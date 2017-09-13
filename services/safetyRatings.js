const rp = require('request-promise');

const baseUrl = process.env.SAFETY_RATINGS_API_ENDPOINT;

module.exports = {
  getVehicles,
  getVehicleRating
};

function getVehicles({ modelYear, manufacturer, model }) {
  const options = {
    uri: `${baseUrl}/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`,
    json: true
  };

  return rp(options);
}

function getVehicleRating({ vehicleId }) {
  const options = {
    uri: `${baseUrl}/VehicleId/${vehicleId}?format=json`,
    json: true
  };

  return rp(options);
}
