import React from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeToast } from '../../redux-feature/toast_notify';

const bg = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'danger'
};

const icon = {
  info: <i className="bi bi-info-square"></i>,
  success: <i className="bi bi-check-square"></i>,
  warning: <i className="bi bi-exclamation-triangle"></i>,
  error: <i className="bi bi-exclamation-octagon"></i>
};

/**
 * @param {type} type: info | success | warning | error
 * @param {title} title: what notification show for user?
 * @param {content} content: what is the thing user need to know?
 */
const ToastCustom = ({ props }) => {
  const { id, type, title, content } = props;
  const dispatch = useDispatch();

  return (
    <Toast
      onClose={() => {
        dispatch(removeToast(id));
      }}
      bg={bg[type]}
      delay={3000}
      autohide
      animation
    >
      <Toast.Header>
        {icon[type]}
        <strong className="ms-2 me-auto">{title}</strong>
        <small>Just now</small>
      </Toast.Header>
      <Toast.Body className={bg[type] !== 'warning' && 'text-white'}>
        {content}
      </Toast.Body>
    </Toast>
  );
};

export default ToastCustom;
