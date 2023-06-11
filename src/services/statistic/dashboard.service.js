import { AxiosAPI } from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';

const handleGetBoxData = async (dispatch, accessToken) => {
  try {
    let result = await AxiosAPI.get('/statistic/dashboard', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return result.data;
  } catch (error) {
    makeRefreshToken(error, dispatch, newToken =>
      handleGetBoxData(dispatch, newToken)
    );
  }
};

const dashboardStatisticService = {
  getBoxData: handleGetBoxData
};

export default dashboardStatisticService;
