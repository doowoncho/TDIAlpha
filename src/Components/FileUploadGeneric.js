import React, { useState } from 'react';
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uploadFile } from './APICalls';

function FileUpload({type, job, name}) {
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
      if(type === "p_confirm"){
        fileUpload = {permit_confirmation_file: fileBlob, permit_confirmation_name: file.name};
      }else if(type === "permit"){
        fileUpload = {permit_file: fileBlob, permit_name: file.name};
      }else if(type === "map"){
        fileUpload = {map_file: fileBlob, map_drawing_name: file.name};
      }else{
        fileUpload = {photo_file: fileBlob, photo_name: file.name};
      }   
      await uploadFile(fileUpload);
  }

  return (
    <>
      <input type="file" id="fileUpload" className='form-control' onChange={handleFileChange}/>
      {/* <button onClick={handleUpload}>test</button> */}
    </>
  );
}

export default FileUpload;
