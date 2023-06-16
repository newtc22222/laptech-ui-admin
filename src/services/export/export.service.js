import { AxiosAPI } from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';

const handleExportCSVFile = async (accessToken, dispatch, type) => {
  await AxiosAPI.get(`export/${type}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    responseType: 'blob'
  })
    .then(response => {
      console.log(response.headers);
      const downloadUrl = window.URL.createObjectURL(response.data);
      console.log(downloadUrl);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${type + '_' + new Date().toJSON()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.log(error);
      makeRefreshToken(error, dispatch, (newAccessToken, dispatch) =>
        handleExportFile(newAccessToken, dispatch)
      );
    });
};

const exportService = {
  csv: handleExportCSVFile,
  excel: () => {},
  pdf: () => {},
  doc: () => {}
};

export default exportService;
