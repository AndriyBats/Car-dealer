// helpers/constants
import * as H from '../helpers';
import * as C from '../constants';
// endpoints
import * as E from '../utilities/endpoints';
/////////////////////////////////////////////////

export const getModelsForMakeIdYear = async (makeId, year) => {
  try {
    const response = await fetch(E.MODELS_FOR_MAKE_ID_YEAR_URL(makeId, year), {
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
