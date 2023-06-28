import { AxiosAPI } from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';

const handleExportCSVFile = async (accessToken, dispatch, type) => {
  await AxiosAPI.get(`export-csv/${type}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    responseType: 'blob'
  })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
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
        handleExportCSVFile(newAccessToken, dispatch)
      );
    });
};

const handleExportExcelFile = async (
  accessToken,
  dispatch,
  options = ['all']
) => {
  await AxiosAPI.get(
    'export-excel' + `?${options.map(option => 'options=' + option).join('&')}`,
    {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      responseType: 'blob'
    }
  )
    .then(response => {
      console.log(response.headers);
      const downloadUrl = window.URL.createObjectURL(response.data);
      console.log(downloadUrl);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `data_${new Date().toJSON()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.log(error);
      makeRefreshToken(error, dispatch, (newAccessToken, dispatch) =>
        handleExportExcelFile(newAccessToken, dispatch)
      );
    });
};

const handleExportPdfFile = async (accessToken, dispatch, invoiceId) => {
  await AxiosAPI.get('invoices/' + invoiceId + '/export-pdf', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    responseType: 'blob'
  })
    .then(response => {
      console.log(response.headers);
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute(
        'download',
        `invoice_${invoiceId + '_' + new Date().toJSON()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.log(error);
      makeRefreshToken(error, dispatch, (newAccessToken, dispatch) =>
        handleExportPdfFile(newAccessToken, dispatch)
      );
    });
};

const exportService = {
  csv: handleExportCSVFile,
  excel: handleExportExcelFile,
  pdf: handleExportPdfFile,
  doc: () => {}
};

export default exportService;
