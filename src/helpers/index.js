import * as R from 'ramda';
//////////////////////////////////////////////////

export const isTrue = R.equals(true);
export const notEquals = R.complement(R.equals);
export const isNotEmpty = R.complement(R.isEmpty);
export const isNilOrEmpty = value => R.or(R.isNil(value), R.isEmpty(value));
export const isNotNilAndNotEmpty = value => R.and(R.isNotNil(value), isNotEmpty(value));

// getters
export const getPropFromObject = (propName, object) => R.path([propName], object);
