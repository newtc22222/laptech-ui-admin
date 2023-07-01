import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ModalForm } from '../../../components/common';

import { Form, TextInput } from '../../../components/validation';
import content from '../content';
import { getStringBackTime } from '../../../utils';

const CommentReplyForm = ({ handleBack, ...rest }) => {
  const { commentReply, currentUser, handleReplyComment } = rest;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty }
  } = useForm();

  const onSubmit = data => {
    const newComment = {
      rootCommentId: commentReply.id,
      productId: commentReply.productId,
      content: data.content,
      username: currentUser.name + ' - Manager',
      phone: currentUser.phone
    };
    handleReplyComment(newComment);
    handleBack();
  };

  return (
    <ModalForm title={content.form.replyComment} centered disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={onSubmit}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <div className="border rounded px-3 py-1 mb-3">
          <figure>
            <blockquote className="blockquote">
              <p>{commentReply.content}</p>
            </blockquote>
            <figcaption className="blockquote-footer">
              {commentReply.username + ' | ' + commentReply.phone} |{' '}
              <cite title="Date created">
                {getStringBackTime(commentReply.createdDate)}
              </cite>
            </figcaption>
          </figure>
        </div>
        <TextInput
          register={register}
          errors={errors}
          attribute="content"
          required
          minLength={10}
          errorMessage={content.form.errorMessage}
          errorMessageForMin={content.form.errorMessageForMin.replace('x', 10)}
        />
      </Form>
    </ModalForm>
  );
};

export default CommentReplyForm;
