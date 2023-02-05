import { BASE_URL, handleResponse } from "./config";

/**
 * **use for upload data**
 * - images
 * - files
 * - etc..
 */

const apiUpload = {
  uploadImage: async (data, token) => {
    const response = await fetch(
      `${BASE_URL}/uploads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      }
    )
    return handleResponse(response);
  },
  uploadMultipleImage: (imageList, token) => {

  },
}

export default apiUpload;