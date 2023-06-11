import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { productService } from '../../../services';
import FeedbackCard from './FeedbackCard';
import ViewProduct from '../views/ViewProduct';
import ViewUser from '../views/ViewUser';

const FeedbackTab = ({ productIdList, productData, userData, ...rest }) => {
  if (!productData) return <></>;

  const [feedbackList, setFeedbackList] = useState([]);
  const [viewMode, setViewMode] = useState({
    type: '',
    data: null
  });

  useEffect(() => {
    let isMounted = true;

    const fetchFeedbacks = async () => {
      try {
        if (productIdList.length > 0) {
          const promises = productIdList.map(productId =>
            productService.getFeedbacks(productId)
          );
          const allFeedbacks = await Promise.all(promises);

          if (isMounted) {
            // Update state only if the component is still mounted
            setFeedbackList(allFeedbacks.flat());
          }
        } else {
          const feedbacks = await productService.getFeedbacks();
          if (isMounted) {
            // Update state only if the component is still mounted
            setFeedbackList(feedbacks);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
    return () => {
      isMounted = false;
    };
  }, [productIdList]);

  const handleChangeViewMode = (type = '', data = null) => {
    setViewMode({ type: type, data: data });
  };

  return (
    <div className="d-grid gap-2">
      <ViewUser
        show={viewMode.type === 'user'}
        user={viewMode.data}
        handleChangeViewMode={handleChangeViewMode}
      />
      {viewMode.type === 'product' && (
        <ViewProduct
          product={viewMode.data}
          handleChangeViewMode={handleChangeViewMode}
        />
      )}
      {_.sortBy(feedbackList, ['createdDate'])
        .reverse()
        .map(feedback => {
          const dataShow = {
            ...feedback,
            product: _.find(productData, { id: feedback.productId })
          };
          if (feedback.userId) {
            dataShow.user = _.find(userData, { id: feedback.userId });
          } else {
            dataShow.user = _.find(userData, { name: feedback.username });
          }
          return (
            <FeedbackCard
              key={feedback.id}
              data={dataShow}
              handleChangeViewMode={handleChangeViewMode}
              {...rest}
            />
          );
        })}
    </div>
  );
};

export default React.memo(FeedbackTab);
