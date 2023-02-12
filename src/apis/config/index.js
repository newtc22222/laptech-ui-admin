const BASE_URL = "http://localhost:8088/api/v1";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // console.log(response);
  return response.json();
}

export { BASE_URL, handleResponse }