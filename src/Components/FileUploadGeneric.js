import React, { useState } from 'react';
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uploadFile, uploadReceipts } from './APICalls';

function FileUpload({type, task, name}) {
  const [file, setFile] = useState(null);
  let fileBlob;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleUpload(){
    const fileRef = ref(storage, `${file.name}`);
    console.log(fileRef)
    await uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    
    await getDownloadURL(ref(storage, `${file.name}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        fileBlob = url
      })

      let fileUpload = {};
      if(type === "receipts"){
        fileUpload = {file: fileBlob, name: file.name}; 
        await uploadReceipts(fileUpload);
      }
  }

  return (
    <>
      <div className='card mx-2'>
        <div className="card-body">
          <input type="file" onChange={handleFileChange} />
          <button className='my-2 w-100' onClick={handleUpload}>
            Upload File
          </button>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
