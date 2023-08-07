import { useEffect, useState  } from "react";
import { getSpecificJobs } from "../Components/APICalls";
import RequestsTable from "../Components/RequestsTable";

export default function NewRequests(){
    const [jobList, setJobList] = useState([]);

    const fetchData = async () => {
        try {
          const searchParameters = {
            status: 'New'
          }
          const data = await getSpecificJobs(searchParameters);
          setJobList(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

    return(
        <div className="container text-center">
            <h1>New Requests</h1>
            <RequestsTable data = {jobList}></RequestsTable>
        </div>
    )
}