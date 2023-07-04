import React, { useCallback, useEffect, useState, Suspense } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import { Loading, PageHeader } from '../../../components/common';
const LazyProductStatisticBox = React.lazy(() =>
  import('./components/ProductStatisticBox')
);

import { productService } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';

function ProductStatistic() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    data: productList,
    isFetching,
    error
  } = useSelector(state => state.products);
  const [options, setOptions] = useState([]);
  const [showPages, setShowPages] = useState([]);

  useEffect(() => {
    if (!productList) {
      productService.getAll(dispatch);
    } else {
      const optionList = productList.map(product => ({
        value: product.id,
        label: product.name
      }));
      setOptions(optionList);
      setShowPages(_.shuffle(optionList).slice(0, 3)); // random 3 products when mount
    }
  }, [productList, dispatch]);

  const handleClosePage = useCallback(pageId => {
    setShowPages(prev => prev.filter(page => page.value !== pageId));
  }, []);

  return (
    <div>
      <PageHeader pageName={'Thống kê sản phẩm'} />
      <Select
        isMulti
        isClearable
        name="products"
        classNamePrefix="select"
        isDisabled={!productList || isFetching || error}
        options={options}
        value={showPages}
        onChange={setShowPages}
      />
      <div className="row row-cols-1 row-cols-xl-2 g-2 mt-2">
        {showPages.map((page, idx) => (
          <Suspense key={idx} fallback={<Loading />}>
            <div className="col">
              <LazyProductStatisticBox
                handleClosePage={handleClosePage}
                product={productList.find(product => product.id === page.value)}
                accessToken={accessToken}
                dispatch={dispatch}
              />
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export default ProductStatistic;
