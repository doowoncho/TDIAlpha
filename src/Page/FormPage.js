import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Components/Firebase';
import { createtask, files } from '../Components/APICalls';
import DateInput from '../Components/DateInput';
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [dates, setDates] = useState([{ startDate: '', startTime: '', endDate: '', endTime: '', NPAT: false, exWeekend: false, twentyFour: false }]);
  // const [task, settask] = useState();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const handleCheckboxChanges = (index, field, value) => {
    console.log(index,field,value)
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const addDate = () => {
    setDates([...dates, { startDate: '', startTime: '', endDate: '', endTime: '', NPAT: false, exWeekend: false, twentyFour: false }]);
  };

  const deleteDate = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

   async function fileUploading (createdtask) {
    if(file){
      const fileRef = ref(storage, `${file.name}`);
      let fileBlob;
      const id = createdtask.id;

      await uploadBytes(fileRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      
      await getDownloadURL(ref(storage, `${file.name}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          fileBlob = url
        });

      let update = {photo_file: fileBlob, photo_name: file.name};   
      await files(id, update);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const customer = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const location = document.getElementById('location').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    //fix this when im actually awake
    dates.forEach(async (dateTime) => {  
      if(dateTime.twentyFour == true){
        if(dateTime.exWeekend == true){
          //create start task
          let beginDate = new Date(dateTime.startDate + 'T' + dateTime.startTime);
          const newtask = {
            customer: customer,
            status: 'New',
            email: email,
            po_number: poNumber,
            wo_number: woNumber,
            setup: location,
            starttime: beginDate,
            npat: dateTime.NPAT,
            phone_number: phoneNumber
          };
          const createdtask = await createtask(newtask);
          fileUploading(createdtask)

          let currentDate = new Date(dateTime.startDate);
          currentDate.setDate(currentDate.getDate() + 2);
          while (currentDate <= new Date(dateTime.endDate)){
            if(currentDate.getDay() == 5){
              //add task to pick up the sign
              const newtask = {
                customer: customer,
                status: 'New',
                email: email,
                po_number: poNumber,
                wo_number: woNumber,
                setup: location,
                endtime: currentDate,
                npat: dateTime.NPAT,
                phone_number: phoneNumber
                
              };
              const createdtask = await createtask(newtask);
              fileUploading(createdtask)
            }
            else if(currentDate.getDay() == 1){
              //add task to place the sign
              const newtask = {
                customer: customer,
                status: 'New',
                email: email,
                po_number: poNumber,
                wo_number: woNumber,
                setup: location,
                starttime: currentDate,
                npat: dateTime.NPAT,
                phone_number: phoneNumber
              };
              const createdtask = await createtask(newtask);
              fileUploading(createdtask)
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
          const newtask1 = {
            customer: customer,
            status: 'New',
            email: email,
            po_number: poNumber,
            wo_number: woNumber,
            setup: location,
            endtime: dateTime.endDate,
            npat: dateTime.NPAT,
            phone_number: phoneNumber
          };
          const createdtask1 = await createtask(newtask1);
          fileUploading(createdtask1)
        }
        else{
            //two tasks, one for putting down and one for picking stuff up
            let beginDate = new Date(dateTime.startDate + 'T' + dateTime.startTime);
            let endDate = new Date(dateTime.endDate + 'T' + dateTime.endTime);
            const newtask = {
              customer: customer,
              status: 'New',
              email: email,
              po_number: poNumber,
              wo_number: woNumber,
              setup: location,
              starttime: beginDate,
              npat: dateTime.NPAT,
              phone_number: phoneNumber
            };
            const createdtask = await createtask(newtask);
            fileUploading(createdtask)
            const newtask1 = {
              customer: customer,
              status: 'New',
              email: email,
              po_number: poNumber,
              wo_number: woNumber,
              setup: location,
              endtime: endDate,
              npat: dateTime.NPAT,
              phone_number: phoneNumber
            };
            const createdtask1 = await createtask(newtask1);
            fileUploading(createdtask1)
          }
        }
        else{
          const startTime = new Date(dateTime.startDate + 'T' + dateTime.startTime);
        const endTime = new Date(dateTime.startDate + 'T' + dateTime.endTime);
        const newtask = {
          customer: customer,
          status: 'New',
          email: email,
          po_number: poNumber,
          wo_number: woNumber,
          setup: location,
          starttime: startTime,
          endtime: endTime,
          npat: dateTime.NPAT,
          phone_number: phoneNumber
        };
        const createdtask = await createtask(newtask);
        fileUploading(createdtask)
      }
      navigate("/taskstable/");
    });
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Request a task </h1>
      <form onSubmit={handleSubmit}>

      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="mb-3">
          <label htmlFor="customerName">Contact Name</label>
          <input type="text" className="form-control" id="customerName" placeholder="Enter name" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Number" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label htmlFor="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" placeholder="Enter Location" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="fileUpload">Photo</label>
          <input type="file" id="fileUpload" className='form-control' onChange={handleFileChange}/>
        </div>
      </div>

      <div className='container justify-content-center d-flex'>
          <div className="flex-column">
            {dates.map((date, index) => (
              <DateInput
                key={index}
                date={date}
                index={index}
                handleDateChange={handleDateChange}
                handleCheckboxChanges={handleCheckboxChanges}
                deleteDate={deleteDate}
              />
            ))}
          <button type="button" className="btn btn-primary my-2" onClick={addDate}>
            Add Date and Time
          </button>
          </div>
        </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      </form>
    </div>
  );
}

export default FormPage;
