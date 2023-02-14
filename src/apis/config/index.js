const BASE_URL = "http://localhost:8088/api/v1";

const handleResponse = (response) => {
  return response.json();
}

export { BASE_URL, handleResponse }