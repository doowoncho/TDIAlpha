import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { getJobById, getFilesById } from "../Components/APICalls";
import { useParams } from 'react-router-dom';
import FileUpload from "../Components/FileUpload";

export default function Orders() {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const [files, setFiles] = useState("");
  let status_bg;


  useEffect(() => {
    async function fetchJob() {
      try{
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);
        setIsLoading(false);
      } catch (error){
        setError("Error retriving Job!");
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

    fetchJob();
    fetchFiles();
  }, [id]);


  const Card = ({info, bg, tc, width, background, type, height}) => (
    <div className={`card bg-${bg} mb-3 `} style={{width:`${width}`, backgroundColor:`${background}`, height:`${height}`, backgroundColor:"#FF6969"}}>
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

  if(job.status === "Completed"){
    status_bg = "success";
  }else if(job.status === "Declined"){
    status_bg = "danger";
  }else if(job.status === "New"){
    status_bg = "primary";
  }else if(job.status === "InProgress"){
    status_bg = "warning";
  }else{
    status_bg = "secondary";
  }


function readableTime(time){
  let readable = new Date(time).toLocaleString()
  return readable
}

  return (
    <div>
      <div className="card border shadow-lg container mt-4 mb-5" style={{width:"50%", border: "none"}}>
        <div className="card-body bg-primary mt-3" style={{width:"10%", textAlign:"center", borderRadius:"5%", color:"white", marginLeft:"85%", padding:"0.5rem", paddingBottom:"0.2rem", paddingTop:"0.2rem"}}>
          <a href={`/jobedit/${job.id}`} style={{textDecoration:"None", textAlign:"center", color:"white"}}>Edit</a>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", gap:"5%"}}>
          <div className="card " style={{display:"flex", alignItems:"center", justifyContent:"center", width:"90%", marginTop:"2rem", marginBottom:"2rem"}}>
            <div className="card-title" style={{fontSize:"2rem", marginRight:"auto", marginLeft:"5%", marginTop:"2%"}}>{job.customer}</div>
            <div className="card-body" style={{display:"flex", alignItems:"center", justifyContent:"space-around", gap:"5%", width:"90%"}}>
            <div style={{display: "flex"}}>
            <div style={{display: "flex"}}>
              <fieldset disabled style={{marginRight: "20px"}}>
                <label for="exampleInputEmail1">ID</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={job.id}/>
              </fieldset>

              <fieldset disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>StartTime:</label>
                <input type="email" class="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={readableTime(job.starttime)}/>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>End Time:</label>
                <input type="email" class="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={readableTime(job.endtime)}/>
              </fieldset>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", gap:"3%", marginLeft:"3%", marginRight:"2%"}}>
          <div className="card border" style={{display:"flex", alignItems:"center", justifyContent:"center", width:"50%", marginBottom:"2rem", border: "none"}}>
            <div className="card-title" style={{fontSize:"1.5rem", marginRight:"auto", marginLeft:"5%", marginTop:"2%"}}>{job.setup}</div>
            <fieldset className="mt-3" disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>Permit/Request#:</label>
                <input type="email" class="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={job.permit_number}/>
            </fieldset>
            <fieldset className="my-3" disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>WO#:</label>
                <input type="email" class="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={job.wo_number}/>
            </fieldset>
            <fieldset className="mb-5" disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>PO#:</label>
                <input type="email" class="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={job.po_number}/>
            </fieldset>
          </div>
          <div style={{marginTop:"1rem", marginBottom:"2rem"}}>
            <Card info={job.status} type="Status" width="20rem" bg={status_bg} tc="white"></Card>
            <div class="card">
              <div class="card-header">Notes</div>
              <div class="card-body">
              <fieldset className="mb-5" disabled>
                  <input type="email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" value={job.notes}/>
              </fieldset>
              </div>
            </div>
            <div className="card text-center" width="20rem" height="19rem">
            </div>
          </div>
        </div>
        <div style={{marginBottom:"3rem"}}>
          <div className="card " style={{width:"83%", margin:"auto"}}>
            <div className="card-title" style={{fontSize:"1.5rem", marginRight:"auto", marginLeft:"5%", marginTop:"2%"}}>Files</div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
              <div class="mb-3 mx-auto" style={{width:"16rem"}}>
                <label for="formFileDisabled" class="form-label">Permit Confirmation</label>
                  <FileUpload type="p_confirm" job={files.permit_confirmation_file} name={files.permit_confirmation_name}></FileUpload>
              </div>
              <div class="mb-3 mx-auto" style={{width:"16rem"}}>
                <label for="formFileDisabled" class="form-label">Permit</label>
                  <FileUpload type="permit" job={files.permit_file} name={files.permit_name}></FileUpload>
              </div>
              <div class="mb-3 mx-4" style={{width:"16rem"}}>
                <label for="formFileDisabled" class="form-label">Map Drawing</label>
                  <FileUpload type="map" job={files.map_file} name={files.map_drawing_name}></FileUpload>
              </div>
              <div class="mb-3 mx-4" style={{width:"16rem"}}>
                <label for="formFileDisabled" class="form-label">Photo</label>
                  <FileUpload type="photo" job={files.photo_file} name={files.photo_name}></FileUpload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
