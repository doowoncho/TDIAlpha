import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Components/Firebase';
import { createJob, createtask, uploadPhoto, getTasksByJobId, updateJob, getAllContacts, createContact } from '../Components/APICalls';
import DateInput from '../Components/DateInput';
import { useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import { createTaskForDate, createTasksForExWeekend, createTasksForRepeat } from '../Helpers/DateUtils';

function FormPage() {
  const [dates, setDates] = useState([{ startDate: '', startTime: '', endDate: '', endTime: '', exWeekend: false, twentyFour: false, repeat: false }]);
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState(null)
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchContacts() {
      const data = await getAllContacts();
      const formattedOptions = data.map(contact => ({
        label: contact.name,
        data: contact // Store all contact data in 'data' property
      }));
      setContacts(formattedOptions);
    }

    fetchContacts();
  }, []);

  const handleContactSelect = (contact) => {
    setContact(contact)
    document.getElementById('companyName').value = contact.data != null ? contact.data.company : '';
    document.getElementById('email').value = contact.data != null ? contact.data.email : '';
    document.getElementById('phoneNumber').value = contact.data != null ? contact.data.phone_number : '';
  };

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
    setDates([...dates, { startDate: '', startTime: '', endDate: '', endTime: '', exWeekend: false, twentyFour: false, repeat: false }]);
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

   async function fileUploading (createdJob) {
    if(file){
      const fileRef = ref(storage, `${file.name}`);
      let fileBlob;
      const id = createdJob.id;

      await uploadBytes(fileRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      
      await getDownloadURL(ref(storage, `${file.name}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          fileBlob = url
        });

        let update = {
          job_id: id,
          name: file.name,
          file: fileBlob
        };
        await uploadPhoto(update);
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const requestID = document.getElementById('requestID').value;
    const company = document.getElementById('companyName').value;
    const NPAT = document.getElementById('npat').checked;
    const location = document.getElementById('location').value;

    let job = await createJob()
    let earliestStartDate = null;
    let latestEndDate = null;
    
    setLoading(true); // Set loading state to true

    await Promise.all(
      dates.map(async (dateTime) => {
      if (!earliestStartDate || new Date(dateTime.startDate) < earliestStartDate) {
        earliestStartDate = new Date(dateTime.startDate + 'T' + dateTime.startTime);
      }
      
      if ((!dateTime.endDate && (!latestEndDate || new Date(dateTime.startDate) > latestEndDate)) ||
      (dateTime.endDate && (!latestEndDate || new Date(dateTime.endDate) > latestEndDate))) {
        latestEndDate = dateTime.endDate ? new Date(dateTime.endDate + 'T' + dateTime.endTime) : new Date(dateTime.startDate + 'T' + dateTime.endTime);
      }

      if (dateTime.twentyFour) {
          // Two tasks, one for putting down and one for picking stuff up
          await createTaskForDate(dateTime.startDate, dateTime.startTime, null, null, job, 'place');
          await createTaskForDate(null, null, dateTime.endDate, dateTime.endTime, job, location, 'pickup');
      } 
      else if(dateTime.repeat){
          if (dateTime.exWeekend) {          
            // Creating tasks for the inbetween
            await createTasksForExWeekend(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, location);
          } else {
            await createTasksForRepeat(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, location)
          }
      }
      else {
        // Non-twentyFour task
        await createTaskForDate(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, location);
      }
    })
    );
    
    //NPAT task
    if(NPAT){
      let npatStartDate = new Date(earliestStartDate);
      npatStartDate.setDate(npatStartDate.getDate() - 1)
      await createTaskForDate(npatStartDate, null, null, null, job, location, "npat");
    }
    
    updateJob(job.id, 
      {
        contact:contact.label, 
        status: "New",
        starttime: earliestStartDate,
        endtime: latestEndDate, 
        wo_number: woNumber,
        po_number: poNumber,
        email: email,
        setup: location,
        phone_number: phoneNumber,
        request_id: requestID,
        company: company
      }) 

      await fileUploading(job);
      if(!contacts.find(x => x.data.name == contact.label && x.data.email == email)){
        var temp = {
          name: contact.label,
          email: email,
          phone_number: phoneNumber,
          company: company
        }
        createContact(temp)
      }

      setLoading(false); // Set loading state to false after all tasks are created
  
      navigate("/jobstable/");
    }
    
    return (
      <>
       {loading 
       ?  (
            // Loading page with a spinner or message
            <div className="text-center">
              <h2>Loading...</h2>
            </div>
          ) 

        : (
          // Main form page
        <div className="container">
        <h1 className="my-4 text-center">Request a Job </h1>
        <form onSubmit={handleSubmit}>

        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="mb-3">
            <label>Contact Name</label>
            <CreatableSelect
                options={contacts}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Enter contact"
                onChange={handleContactSelect}
                getOptionLabel={(contacts) => `${contacts.label}${contacts.data ? ': ' +contacts.data.email : ''}`}
                required
            />
          </div>
          <div className="mb-3">
            <label>Company Name</label>
            <input type="text" className="form-control" id="companyName" placeholder="Enter name" required/>
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input type="text" className="form-control" id="email" placeholder="Enter email" required/>
          </div>
          <div className="mb-3">
            <label>Phone Number</label>
            <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Number" required/>
          </div>
          <div className="mb-3">
            <label>WO Number</label>
            <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)" />
          </div>
          <div className="mb-3">
            <label >PO Number</label>
            <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)" />
          </div>
          <div className="mb-3">
            <label>Request ID</label>
            <input type="text" className="form-control" id="requestID" placeholder="Enter Request ID (Optional)" />
          </div>
          <div className="mb-3">
            <label>Setup</label>
            <input type="text" className="form-control" id="location" placeholder="Enter Location" required/>
          </div>
          <div className="mb-3">
            <label>Photo</label>
            <input type="file" id="fileUpload" className='form-control' onChange={handleFileChange}/>
          </div>
          <div className="mb-3">
            <input className="form-check-input mx-2" type="checkbox" id="npat"/>
            <label className="form-check-label">NPAT Job</label>
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
            <button type="button" className="btn btn-primary my-2" onClick={addDate}> Add Date and Time </button>
            </div>
          </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
      </div>
          )
      }
    </>
  );
}

export default FormPage;
