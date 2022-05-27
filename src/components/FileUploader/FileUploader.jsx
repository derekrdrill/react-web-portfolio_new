import React, { useState } from 'react';
import axios from 'axios';

export const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const onChange = e => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };

  const onSubmit = async () => {
    // e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach(file => {
      console.log(file);
      formData.append('uploadImages', file);
    });

    console.log(formData);

    // try {
    //   //   const res =
    //   await axios.post('../../upload-images', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   //   console.log(res);
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     console.log(err);
    //   } else {
    //     console.log(err.response.data.msg);
    //   }
    // }
  };

  console.log(files);

  return (
    <div>
      <input type='file' multiple onChange={onChange} />
      <br />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
