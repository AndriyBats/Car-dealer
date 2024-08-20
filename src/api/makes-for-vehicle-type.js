// helpers/constants
import * as H from '../helpers';
import * as C from '../constants';
// endpoints
import * as E from '../utilities/endpoints';
/////////////////////////////////////////////////

export const getMakesForVehicleType = async () => {
  try {
    const response = await fetch(E.MAKES_FOR_VEHICLE_TYPE_URL, {
      method: E.METHODS.GET,
    });

    const status = H.getPropFromObject(C.STATUS, response);

    if (H.notEquals(status, C.ERROR_STATUS_TYPES.OK)) {
      const { error } = await response.json();

      throw new Error(error);
    }

    return response.json();
  } catch (error) {

    throw error;
  }
};
