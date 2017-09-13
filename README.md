# Modus Create test assignment

## Arturo Dominguez

### Requirements

- `nodejs >= 6.11.3`

### Running locally

- Run `npm install`
- Make a copy of `.env.sample` file and rename it to `.env`
  - Set the `SAFETY_RATINGS_API_ENDPOINT` env var to `https://one.nhtsa.gov/webapi/api/SafetyRatings` in the `.env` file
- Run `npm start`

### Running tests

- Run `npm test`

### Notes

- To test the post route manually, the content must be sent as `application/json`
