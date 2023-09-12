import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { getJobById } from "../Components/APICalls";
import { useParams } from 'react-router-dom';
import FileUpload from "../Components/FileUpload";

export default function Orders() {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);

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

    fetchJob();
  }, [id]);


  const Card = ({info, bg, tc, width, background, type, height}) => (
    <div className={`card bg-${bg} mb-3 `} style={{width:`${width}`, backgroundColor:`${background}`, height:`${height}`, backgroundColor:"#FF6969"}}>
      <div className="card-body">
        <h6 className={`card-header text-${tc}`} style={{textAlign:"center", fontSize:"0.8rem", marginTop:"1%", color:"#582525"}}>{type}</h6>
        <h4 className={`card-title text-center text-${tc}`} style={{marginTop:"2%", textAlign:"center", color:"#582525"}}>{info}</h4>
      </div>
    </div>
  )

  const Files = ({width, bg, icon, link}) => (
    <div className={`card border border-success  bg-${bg} mb-2 `} style={{width:`${width}`}}>
      <div className="card-body">
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <a href={`${link}`}><i className={`${icon}`} style={{ fontSize: "2rem" }}></i></a>
        </div>
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

  return (
    <div>
      <div className="card border shadow-lg container mt-4" style={{width:"50%", border: "none"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", gap:"5%"}}>
          <div className="card " style={{display:"flex", alignItems:"center", justifyContent:"center", width:"60%", marginTop:"2rem", marginBottom:"2rem"}}>
            <div className="card-title" style={{fontSize:"2rem", marginRight:"auto", marginLeft:"5%", marginTop:"2%"}}>{job.customer}</div>
            <div className="card-body" style={{display:"flex", alignItems:"center", justifyContent:"space-around", gap:"5%", width:"90%"}}>
            <div style={{display: "flex"}}>
            <div style={{display: "flex"}}>
              <fieldset disabled style={{marginRight: "20px"}}>
                <label for="exampleInputEmail1">ID</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={job.id}/>
              </fieldset>

              <fieldset disabled>
                <label for="exampleInputDate" style={{marginRight: "5px"}}>Date:</label>
                <input type="email" class="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={job.startdate}/>
              </fieldset>
            </div>
            </div>
            </div>
          </div>
          <div>
            <img src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.png" style={{height:"8rem"}}></img>
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
                  <input type="email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" value={job.notes}/>
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
                  <FileUpload type="p_confirm"></FileUpload>
              </div>
              <div class="mb-3 mx-auto" style={{width:"16rem"}}>
                <label for="formFileDisabled" class="form-label">Permit</label>
                  <FileUpload type="permit"></FileUpload>
              </div>
              <div class="mb-3 mx-4" style={{width:"16rem"}}>
                <label for="formFileDisabled" class="form-label">Map Drawing</label>
                  <FileUpload type="map"></FileUpload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
