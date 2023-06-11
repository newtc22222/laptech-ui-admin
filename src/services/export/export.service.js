import { AxiosAPI } from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';

const handleExportFile = async (accessToken, dispatch) => {
  try {
    const response = await AxiosAPI.get('export/test', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      responseType: 'blob'
    });
    console.log(response);
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    makeRefreshToken(error, dispatch, (newAccessToken, dispatch) =>
      handleExportFile(newAccessToken, dispatch)
    );
  }
};

const exportService = {
  test: handleExportFile
};

export default exportService;
