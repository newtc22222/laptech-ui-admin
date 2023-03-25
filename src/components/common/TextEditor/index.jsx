import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

const TextEditor = ({ tab, handleSaveContent }) => {
  const [value, setValue] = useState(tab.content || '');

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      <div className="d-flex flex-row-reverse mt-2 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setValue(tab.content)}
        >
          Revert
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => handleSaveContent(value, tab.id)}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default TextEditor;
