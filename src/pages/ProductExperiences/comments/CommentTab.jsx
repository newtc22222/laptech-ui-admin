import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { productService } from '../../../services';
import CommentCard from './CommentCard';
import CommentReplyForm from './CommentReplyForm';
import ViewProduct from '../views/ViewProduct';

const getCommentListGroup = commentList => {
  const commentRootGroup = _.groupBy(commentList, 'rootCommentId');
  const commentRootList = commentRootGroup[null];

  const finalList = commentRootList?.map(commentRoot => {
    if (Object.keys(commentRootGroup).includes(commentRoot.id)) {
      return { ...commentRoot, childrens: commentRootGroup[commentRoot.id] };
    }
    return commentRoot;
  });
  return finalList || [];
};

const CommentTab = ({ productIdList, productData, ...rest }) => {
  if (!productData) return <></>;

  const [showCommentReplyForm, setShowCommentReplyForm] = useState(false);
  const [viewProduct, setViewProduct] = useState({
    visible: false,
    data: null
  });
  const [commentReply, setCommentReply] = useState(null);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchCommentList = async () => {
      try {
        if (productIdList.length > 0) {
          const promises = productIdList.map(productId =>
            productService.getComments(productId)
          );
          const allComments = await Promise.all(promises);
          if (isMounted) {
            setCommentList(getCommentListGroup(allComments.flat()));
          }
        } else {
          const comments = await productService.getComments();
          if (isMounted) {
            setCommentList(getCommentListGroup(comments));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommentList();
    return () => {
      isMounted = false;
    };
  }, [productIdList]);

  const handleChangeViewProduct = (visible = false, data = null) => {
    setViewProduct({ visible: visible, data: data });
  };

  const handleShowCommentReplyForm = data => {
    setCommentReply(data);
    setShowCommentReplyForm(true);
  };

  return (
    <div className="d-grid gap-2">
      {showCommentReplyForm && (
        <CommentReplyForm
          handleBack={() => setShowCommentReplyForm(false)}
          commentReply={commentReply}
          currentUser={rest.currentUser}
          handleReplyComment={rest.handleReplyComment}
        />
      )}
      {viewProduct.visible && (
        <ViewProduct
          product={viewProduct.data}
          handleChangeViewMode={handleChangeViewProduct}
        />
      )}
      {_.sortBy(commentList, ['createdDate'])
        .reverse()
        .map(comment => {
          const dataShow = {
            ...comment,
            product: _.find(productData, { id: comment.productId })
          };
          return (
            <CommentCard
              key={comment.id}
              data={dataShow}
              handleChangeViewProduct={handleChangeViewProduct}
              handleShowCommentReplyForm={handleShowCommentReplyForm}
              {...rest}
            />
          );
        })}
    </div>
  );
};

export default React.memo(CommentTab);
