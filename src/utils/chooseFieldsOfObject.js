import _ from 'lodash';

/**
 * @param {object[]} data
 * @param {string[]} fields
 * @see https://stackoverflow.com/questions/37877860/lodash-pick-object-fields-from-array
 */
function chooseFieldsOfObject(data, fields) {
  const mapData = _.map(data, _.partialRight(_.pick, fields));
  return mapData;
}

export default chooseFieldsOfObject;
