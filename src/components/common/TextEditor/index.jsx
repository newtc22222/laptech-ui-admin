import React from 'react';
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

const TextEditor = ({ tab, handleChangeContent }) => {
  return (
    <>
      <ReactQuill
        theme="snow"
        value={tab.content}
        onChange={value => {
          handleChangeContent(value, tab.id);
        }}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default TextEditor;
