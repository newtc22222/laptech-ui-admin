import _ from 'lodash';

/**
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
function isEqualObject(a, b) {
  return _.isEqual(a, b);
}

export default isEqualObject;
