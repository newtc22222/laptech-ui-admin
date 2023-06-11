import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';

import { PageHeader, Loading } from '../../components/common';
import FilterProductForm from './FilterProductForm';
import FeedbackTab from './feedbacks/FeedbackTab';
import CommentTab from './comments/CommentTab';

import { productService, userService } from '../../services';
import { getUpdateByUserInSystem } from '../../utils';
import content from './content';

const ProductExperiences = () => {
  const dispatch = useDispatch();
  const {
    data: productList,
    isFetching,
    error
  } = useSelector(state => state['products']);
  const {
    data: userList,
    isUserFetching,
    isUserError
  } = useSelector(state => state['users']);
  const { accessToken, user: currentUser } = useSelector(state => state.auth);

  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    if (!productList || error) {
      productService.getAll(dispatch);
    }
    if (!userList || isUserError) {
      userService.getAll(dispatch, accessToken);
    }
  }, [dispatch, accessToken]);

  const handleDisableFeedback = useCallback(
    id => {
      productService
        .disableFeedback(dispatch, id, getUpdateByUserInSystem, accessToken)
        .then(() => setProductOptions([]));
    },
    [accessToken]
  );

  const handleReplyComment = useCallback(
    data => {
      const newComment = {
        ...data,
        username: currentUser.name,
        phone: currentUser.phone,
        ...getUpdateByUserInSystem()
      };
      productService
        .replyComment(dispatch, newComment, accessToken)
        .then(() => setProductOptions([]));
    },
    [accessToken, currentUser]
  );

  const handleDisableComment = useCallback(
    id => {
      productService
        .disableComment(dispatch, id, getUpdateByUserInSystem, accessToken)
        .then(() => setProductOptions([]));
    },
    [accessToken]
  );

  if (!productList || isFetching || !userList || isUserFetching)
    return <Loading />;

  return (
    <>
      <PageHeader pageName={content.pageName}></PageHeader>

      <div className="container-fluid">
        <FilterProductForm
          productOption={productOptions}
          setProductOption={setProductOptions}
          options={productList.map(product => {
            return { label: product.name, value: product.id };
          })}
        />
        <Tabs defaultActiveKey="feedback" className="nav-pills nav-fill my-3">
          <Tab eventKey="feedback" title={content.feedback}>
            <FeedbackTab
              productData={productList}
              userData={userList}
              productIdList={productOptions.map(option => option.value)}
              handleDisableFeedback={handleDisableFeedback}
            />
          </Tab>
          <Tab eventKey="comment" title={content.comment}>
            <CommentTab
              productData={productList}
              productIdList={productOptions.map(option => option.value)}
              handleDisableComment={handleDisableComment}
              handleReplyComment={handleReplyComment}
              currentUser={currentUser}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProductExperiences;
