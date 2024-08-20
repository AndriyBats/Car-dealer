// base URL
const BASE_URL = process.env.BASE_URL;

// endpoints
export const MAKES_FOR_VEHICLE_TYPE_URL = `${BASE_URL}/GetMakesForVehicleType/car?format=json`;
export const MODELS_FOR_MAKE_ID_YEAR_URL = (makeId, year) =>
    `${BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;

// API methods
export const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
  };
