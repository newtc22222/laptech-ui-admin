import { AxiosAPI } from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';

const handleGetProductFigures = async (
  dispatch,
  accessToken,
  productId,
  range
) => {
  const url =
    '/statistic/products/' + productId + (range ? `?range=${range}` : '');
  try {
    let result = await AxiosAPI.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return result.data;
  } catch (error) {
    makeRefreshToken(error, dispatch, newToken =>
      handleGetProductFigures(dispatch, newToken, productId, range)
    );
  }
};

const handleGetAllProductsFigures = async (
  dispatch,
  accessToken,
  brandIdList = [],
  categoryIdList = [],
  limit
) => {
  // build query
  let url = '/statistic/products';
  let brandQuery = '';
  let categoryQuery = '';
  let limitQuery = !!limit ? 'limit=' + limit : '';
  if (brandIdList.length > 0) {
    brandQuery = brandIdList.map(brandId => 'brandId=' + brandId).join('&');
  }
  if (categoryIdList.length > 0) {
    categoryQuery = categoryIdList
      .map(categoryId => 'categoryId=' + categoryId)
      .join('&');
  }
  const params = [brandQuery, categoryQuery, limitQuery].filter(item => !!item);
  url = url + '?' + params.join('&');

  try {
    let result = await AxiosAPI.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return result.data;
  } catch (error) {
    makeRefreshToken(error, dispatch, newToken =>
      handleGetAllProductsFigures(
        dispatch,
        newToken,
        brandIdList,
        categoryIdList,
        limit
      )
    );
  }
};

const handleGetAllUserFigures = async (
  dispatch,
  accessToken,
  dateFilter,
  range
) => {
  let url = '/statistic/users';
  if (!!dateFilter && !!range) {
    url += '?dateFilter=' + dateFilter + '&range=' + range;
  } else if (!!dateFilter) {
    url += '?dateFilter=' + dateFilter;
  } else if (!!range) {
    url += '?range=' + range;
  }
  try {
    let result = await AxiosAPI.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return result.data;
  } catch (error) {
    makeRefreshToken(error, dispatch, newToken =>
      handleGetAllUserFigures(dispatch, newToken, dateFilter, range)
    );
  }
};

const handleGetProfitFigures = async (dispatch, accessToken, options = []) => {
  try {
    let result = await AxiosAPI.get('/statistic/profits', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return result.data;
  } catch (error) {
    makeRefreshToken(error, dispatch, newToken =>
      handleGetProfitFigures(dispatch, newToken, options)
    );
  }
};

const statisticService = {
  getAllProductsFigures: handleGetAllProductsFigures,
  getProductFigures: handleGetProductFigures,
  getProfitFigures: handleGetProfitFigures,
  getUsersFigures: handleGetAllUserFigures
};

export default statisticService;
