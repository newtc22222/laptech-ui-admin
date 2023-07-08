import { CLOUDINARY } from '../config/constract';

/**
 * **use for upload data**
 * - images
 * - files
 * - etc..
 */

const uploadService = {
  cloudinarySingle: async (file, folderName) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);
    if (folderName) formData.append('folder', folderName);
    const response = await fetch(CLOUDINARY.URL, {
      method: 'POST',
      body: formData
    });
    return response.json();
  },
  cloudinaryMultiple: async (files = [], folderName) => {
    const uploadPromises = Array.from(files).map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);
      if (folderName) formData.append('folder', folderName);

      return fetch(CLOUDINARY.URL, {
        method: 'POST',
        body: formData
      });
    });

    const responses = await Promise.all(uploadPromises);

    const uploadResults = await Promise.all(
      responses.map(response => response.json())
    );
    return uploadResults;
  }
};

export default uploadService;
