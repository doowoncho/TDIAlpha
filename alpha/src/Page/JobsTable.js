import { useEffect, useState  } from "react";
import { getAllJobs } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";

export default function JobsTable(){
  const Card = ({ bg, header, icon, color, num, link}) => 
  (
        <div className={`card ${bg} mx-2 border p-3 bg-white rounded`}>
          <a style={{textDecoration:"none"}} href ={link}>
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="align-self-center">
                  <i className={`${icon} mx-3 ${color}`} style={{ fontSize: "2rem" }}></i>
                </div>
                <div className='mx-3'></div>
                  <div>
                    <h3 className={`text-center ${color}`}>{num}</h3>
                    <span className={color}>{header}</span>
                  </div>
              </div>
            </div>
          </div>
          </a>
      </div>
  );

    const [jobList, setJobList] = useState([]);

    const fetchData = async () => {
        try {
          const data = await getAllJobs();
          setJobList(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

    return(
      <div>
        <div className='border border-1 bg-light'>
          <div className="container d-flex justify-content-center my-3">
            <Card header="New Requests" num="12" icon="bi bi-bell-fill" color="text-primary" link="/newtable"/>
            <Card header="Declined Jobs" icon="bi bi-exclamation-lg" color="text-danger" link="/declinedtable"/>
            <Card header="Completed" icon="bi bi-check-lg" color="text-success" num="10" link="/"/>
          </div>
        </div>
          <div className="my-4 container text-center">
              <h1>All Jobs</h1>
              <Table data = {jobList}></Table>
          </div>
      </div>
    )
}