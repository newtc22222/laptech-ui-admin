const BASE_URL = 'http://localhost:8088/api/v1';

const handleResponse = response => {
  return response.json();
};

const errorString = {
  400: 'Invalid params!',
  401: 'Invalid token!',
  422: 'Resource has already existed!',
  500: 'Server handle failed!',
  501: ''
};

export { BASE_URL, handleResponse, errorString };
