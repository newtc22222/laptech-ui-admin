import React from 'react';

function Loading() {
  return (
    <div className="text-center">
      <div
        className="spinner-grow text-danger"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow text-warning ms-3 me-3"
        role="status"
        style={{ width: '3rem', height: '3rem', animationDelay: '0.1s' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow text-success"
        role="status"
        style={{ width: '3rem', height: '3rem', animationDelay: '0.2s' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
