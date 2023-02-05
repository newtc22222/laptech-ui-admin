import { BASE_URL, handleResponse } from '../../config';

/** 
 * @param {String} token 
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} httpMethod 
 * @param {Object | null} object 
 * @returns {Object} fetchOption
 */
function handleOption(token, httpMethod, object) {
  const fetchOption = { method: httpMethod };
  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    fetchOption.body = JSON.stringify(object);
    fetchOption.headers = {
      'Content-Type': 'application/json',
    };
  }
  if (httpMethod === 'DELETE') {
    fetchOption.headers = {};
  }
  if (token !== null) {
    fetchOption.headers["Authorization"] = `Bearer ${token}`;
  }
  return fetchOption;
}

/**
 * 
 * @param {String} url 
 * @param {Object} option 
 * @param {() => {}} cb_start 
 * @param {() => {}} cb_success 
 * @param {() => {}} cb_failed 
 */
async function handleFetch(url, option, cb_start, cb_success, cb_failed) {
  cb_start();
  try {
    const response = await fetch(url, option);
    const result = await handleResponse(response);
    cb_success(result);
  }
  catch (err) {
    console.log({ err });
    cb_failed();
  }
}

/**
 * @param {String} object_path path of a thing you want to use
 * @param {Object} object your input data
 * @param {String|null} token your jwtToken
 * @param {() => {}} cb_start callback (fetch started)
 * @param {(data) => {}} cb_success callback (fetch success)
 * @param {() => {}} cb_failed callback (fetch failed)
 */
async function GET_ALL(object_path, object, token, cb_start, cb_success, cb_failed) {
  await handleFetch(
    `${BASE_URL}/${object_path}`,
    handleOption(token, 'GET', object),
    cb_start, cb_success, cb_failed
  );
}

/**
 * @param {String} object_path path of a thing you want to use
 * @param {Object} object your input data
 * @param {String|null} token your jwtToken
 * @param {() => {}} cb_start callback (fetch started)
 * @param {() => {}} cb_success callback (fetch success)
 * @param {() => {}} cb_failed callback (fetch failed)
 */
async function POST(object_path, object, token, cb_start, cb_success, cb_failed) {
  await handleFetch(
    `${BASE_URL}/${object_path}`,
    handleOption(token, 'POST', object),
    cb_start, cb_success, cb_failed
  );
}

/**
 * @param {String} object_path path of a thing you want to use
 * @param {Object} object your input data
 * @param {String|null} token your jwtToken
 * @param {() => {}} cb_start callback (fetch started)
 * @param {() => {}} cb_success callback (fetch success)
 * @param {() => {}} cb_failed callback (fetch failed)
 */
async function PUT(object_path, object, token, cb_start, cb_success, cb_failed) {
  await handleFetch(
    `${BASE_URL}/${object_path}`,
    handleOption(token, 'PUT', object),
    cb_start, cb_success, cb_failed
  );
}

/**
 * @param {String} object_path path of a thing you want to use
 * @param {Object} object your input data
 * @param {String|null} token your jwtToken
 * @param {() => {}} cb_start callback (fetch started)
 * @param {() => {}} cb_success callback (fetch success)
 * @param {() => {}} cb_failed callback (fetch failed)
 */
async function PATCH(object_path, object, token, cb_start, cb_success, cb_failed) {
  await handleFetch(
    `${BASE_URL}/${object_path}`,
    handleOption(token, 'PATCH', object),
    cb_start, cb_success, cb_failed
  );
}

/**
 * @param {String} object_path path of a thing you want to use
 * @param {Object} object your input data
 * @param {String|null} token your jwtToken
 * @param {() => {}} cb_start callback (fetch started)
 * @param {() => {}} cb_success callback (fetch success)
 * @param {() => {}} cb_failed callback (fetch failed)
 */
async function DELETE(object_path, object, token, cb_start, cb_success, cb_failed) {
  await handleFetch(
    `${BASE_URL}/${object_path}`,
    handleOption(token, 'DELETE', object),
    cb_start, cb_success, cb_failed
  );
}

const FetchAPI = {
  GET_ALL,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export default FetchAPI;