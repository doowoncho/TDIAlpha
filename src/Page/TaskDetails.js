import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { gettaskById, getFilesById } from "../Components/APICalls";
import { useParams } from 'react-router-dom';
import FileUpload from "../Components/FileUpload";
import "../Styles/TaskDetails.css"

const moment = require('moment');

export default function Orders() {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [task, settask] = useState(null);
  const [files, setFiles] = useState("");
  let status_bg;


  useEffect(() => {
    async function fetchtask() {
      try{
        const fetchedtask = await gettaskById(id);
        settask(fetchedtask);
        setIsLoading(false);
      } catch (error){
        setError("Error retriving task!");
        setIsLoading(false);
      }
    }

    async function fetchFiles() {
      try {
        const fetchedFiles = await getFilesById(id);
        setFiles(fetchedFiles);
        console.log(fetchedFiles);
      } catch (error) {
        console.error(error);
      }
    }

    fetchtask();
    fetchFiles();
  }, [id]);


  const Card = ({info, bg, tc, width, background, type, height}) => (
    <div id="status-card" className={`card bg-${bg} mb-3 `} style={{width:`${width}`, backgroundColor:`${background}`, height:`${height}`, backgroundColor:"#FF6969"}}>
      <div className="card-body">
        <h6 className={`card-header text-${tc}`} style={{textAlign:"center", fontSize:"0.8rem", marginTop:"1%", color:"#582525"}}>{type}</h6>
        <h4 className={`card-title text-center text-${tc}`} style={{marginTop:"2%", textAlign:"center", color:"#582525"}}>{info}</h4>
      </div>
    </div>
  )

  
  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if(task.status === "Completed"){
    status_bg = "success";
  }else if(task.status === "Declined"){
    status_bg = "danger";
  }else if(task.status === "New"){
    status_bg = "primary";
  }else if(task.status === "InProgress"){
    status_bg = "warning";
  }else{
    status_bg = "secondary";
  }


function readableTime(time){
  let readable = moment(time).format('YYYY-MM-DD h:mmA')
  return readable
}

  return (
    <div>
      <div id="main-container" className="card border shadow-lg container mt-4 mb-5" style={{width:"50%", border: "none"}}>
        <div id="edit_button" className="card-body bg-primary mt-3" style={{width:"10%", textAlign:"center", borderRadius:"5%", color:"white", marginLeft:"85%", padding:"0.5rem", paddingBottom:"0.2rem", paddingTop:"0.2rem"}}>
          <a href={`/taskedit/${task.id}`} style={{textDecoration:"None", textAlign:"center", color:"white"}}>Edit</a>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", gap:"5%"}}>
          <div className="card " style={{display:"flex", alignItems:"center", justifyContent:"center", width:"90%", marginTop:"2rem", marginBottom:"2rem"}}>
            <div className="card-title" style={{fontSize:"2rem", marginRight:"auto", marginLeft:"5%", marginTop:"2%"}}>{task.customer}</div>
            <div className="card-body" style={{display:"flex", alignItems:"center", justifyContent:"space-around", gap:"5%", width:"90%"}}>
            <div style={{display: "flex"}}>
            <div id="date-container" style={{display: "flex"}}>
              <fieldset id="id-fieldset" disabled style={{marginRight: "20px"}}>
                <label>ID</label>
                <input className="form-control"  value={task.id}/>
                <label>Phone</label>
                <input className="form-control"  value={task.phone_number}/>
              </fieldset>

              <fieldset disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>Start Time:</label>
                <input type="email" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={task.starttime && readableTime(task.starttime)}/>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>End Time:</label>
                <input type="email" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={task.endtime && readableTime(task.endtime)}/>
              </fieldset>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", gap:"3%", marginLeft:"3%", marginRight:"2%"}}>
          <div id="info-container" className="card border" style={{display:"flex", alignItems:"center", justifyContent:"center", width:"50%", marginBottom:"2rem", border: "none"}}>
            <div className="card-title" style={{fontSize:"1.5rem", marginRight:"auto", marginLeft:"5%", marginTop:"2%"}}>{task.setup}</div>
            <fieldset className="mt-3" disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>Permit/Request#:</label>
                <input type="email" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={task.permit_number}/>
            </fieldset>
            <fieldset className="my-3" disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>WO#:</label>
                <input type="email" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={task.wo_number}/>
            </fieldset>
            <fieldset className="mb-5" disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>PO#:</label>
                <input type="email" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={task.po_number}/>
            </fieldset>
          </div>
          <div style={{marginTop:"1rem", marginBottom:"2rem"}}>
            <Card info={task.status} type="Status" width="20rem" bg={status_bg} tc="white"></Card>
            <div className="card">
              <div className="card-header">Notes</div>
              <div className="card-body">
              <fieldset className="mb-5" disabled>
                  <input type="email" className="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" value={task.notes}/>
              </fieldset>
              </div>
            </div>
            <div className="card text-center" width="20rem" height="19rem">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
