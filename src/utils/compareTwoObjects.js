import _ from 'lodash';

/**
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
function isEqualObject(a, b) {
  return _.isEqual(a, b);
}

function isEqualObjectExact(a, b) {
  return (
    _.differenceWith(a, b, _.isEqual).length === 0 &&
    _.differenceWith(b, a, _.isEqual).length === 0
  );
}

export { isEqualObject, isEqualObjectExact };
