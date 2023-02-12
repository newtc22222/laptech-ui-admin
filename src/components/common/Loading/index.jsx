import React from 'react';

function Loading() {
  return (
    <div className="text-center">
      <div
        className="spinner-grow text-primary"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
