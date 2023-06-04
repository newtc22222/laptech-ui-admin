import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Tab, Tabs } from 'react-bootstrap';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';

import useFetch from '../../hooks/useFetch';
import content from './content';
import { productService } from '../../services';

const ProductExperiences = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const {
    data: productList,
    isFetching,
    error
  } = useSelector(state => state['products']);

  const { data: comments } = useFetch('/comments');
  const { data: feedbacks } = useFetch('/feedbacks');

  const [productOptions, setProductOptions] = useState([
    { label: 'All', value: 'all' }
  ]);
  const [commentList, setCommentList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (!productList || error) {
      productService.getAll(dispatch);

      const comments = productService.getComments();
      setCommentList(comments);
      const feedbacks = productService.getFeedbacks();
      console.log(feedbacks);
      setFeedbackList(feedbacks);
    }
  }, [dispatch, productList, error]);

  useEffect(() => {
    productService.getComments().then(res => console.log('res', res));
    // setCommentList(comments);
    // setFeedbackList(feedbacks);
  }, [productOptions]);

  if (!productList) return <Loading />;

  return (
    <>
      <PageHeader pageName={content.pageName}></PageHeader>
      <div className="container-fluid">
        <Tabs defaultActiveKey="feedback" className="nav-pills nav-fill mb-3">
          <Tab eventKey="feedback" title="Feedback">
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="comment" title="Comment">
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProductExperiences;
