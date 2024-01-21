import React, { useEffect, useState } from 'react';
import Table from '../Components/Table';
import FileUpload from '../Components/FileUploadGeneric';

export default function ReceiptsPage() {

  return (
    <>
    <div className="container">
    <h1 className="my-4 text-center">Receipts</h1>
    <FileUpload />
    </div>
    </>
  );
}
