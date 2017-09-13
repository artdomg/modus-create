const sinon = require('sinon');
const proxyquire = require('proxyquire');

const emptyResults = {
  Count: 0,
  Results: []
};
const vehiclesResponseMock = {
  Count: 1,
  Message: 'Results returned successfully',
  Results: [
    {
        VehicleDescription: '2015 Audi A3 4 DR AWD',
        VehicleId: 9403
    }
  ]
};
const ratingResponseMock = {
    Count: 1,
    Message: "Results returned successfully",
    Results: [
        {
            OverallRating: "5",
            VehicleId: 9403
        }
    ]
};
const safetyRatingsService = {
  getVehicles: sinon.stub().returns(Promise.resolve(vehiclesResponseMock)),
  getVehicleRating: sinon.stub().returns(Promise.resolve(ratingResponseMock))
};

const vehiclesController = proxyquire('../../controllers/vehicles', {
  '../services/safetyRatings': safetyRatingsService
});

let req, res, next;

describe('vehicles controller', () => {
  beforeEach(() => {
    next = sinon.stub();
    res = {
      send: sinon.stub()
    };
    req = {
      body: {},
      query: {},
      params: {}
    };
  });

  describe('requirement 1: get route', () => {
    beforeEach(() => {
      req.params = {
        modelYear: 2015,
        manufacturer: 'Audi',
        model: 'A3'
      };
    });

    describe('when the modelYear is not an integer', () => {
      beforeEach(() => {
        req.params.modelYear = 'foo';
      });

      it('should return empty results', () => {
        vehiclesController.getVehicles(req, res, next);
        sinon.assert.calledWith(res.send, emptyResults);
      });
    });

    describe('when the data is valid', () => {
      it('should return an array of 1 element', () => {
        return vehiclesController.getVehicles(req, res, next)
          .then(() => {
            sinon.assert.calledWith(res.send, {
              Count: 1,
              Results: [
                {
                    Description: '2015 Audi A3 4 DR AWD',
                    VehicleId: 9403
                }
              ]
            });
          });
      });
    });

    describe('when withRating query param is set to true', () => {
      beforeEach(() => {
        req.query.withRating = 'true';
      });

      it('should return an array of 1 element with a CrashRating property', () => {
        return vehiclesController.getVehicles(req, res, next)
          .then(() => {
            sinon.assert.calledWith(res.send, {
              Count: 1,
              Results: [
                {
                    Description: '2015 Audi A3 4 DR AWD',
                    VehicleId: 9403,
                    CrashRating: "5"
                }
              ]
            });
          });
      });
    });

    describe('when withRating query param is set to bananas', () => {
      beforeEach(() => {
        req.query.withRating = 'bananas';
      });

      it('should return an array of 1 element without a CrashRating property', () => {
        return vehiclesController.getVehicles(req, res, next)
          .then(() => {
            sinon.assert.calledWith(res.send, {
              Count: 1,
              Results: [
                {
                    Description: '2015 Audi A3 4 DR AWD',
                    VehicleId: 9403
                }
              ]
            });
          });
      });
    });
  });

  describe('requirement 2: post route', () => {
    beforeEach(() => {
      req.body = {
        modelYear: 2015,
        manufacturer: 'Audi',
        model: 'A3'
      };
    });

    describe('when the modelYear is not an integer', () => {
      beforeEach(() => {
        req.body.modelYear = 'foo';
      });

      it('should return empty results', () => {
        vehiclesController.postVehicles(req, res, next);
        sinon.assert.calledWith(res.send, emptyResults);
      });
    });

    describe('when the data is valid', () => {
      it('should return an array of 1 element', () => {
        return vehiclesController.postVehicles(req, res, next)
          .then(() => {
            sinon.assert.calledWith(res.send, {
              Count: 1,
              Results: [
                {
                    Description: '2015 Audi A3 4 DR AWD',
                    VehicleId: 9403
                }
              ]
            });
          });
      });
    });
  });

});
