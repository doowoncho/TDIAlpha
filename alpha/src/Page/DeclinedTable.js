import { useEffect, useState  } from "react";
import { getSpecificJobs } from "../Components/APICalls";
import Table from "../Components/Table";

export default function DeclinedTable(){
    const [jobList, setJobList] = useState([]);

    const fetchData = async () => {
        try {
          const searchParameters = {
            status: 'Declined'
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
        <div className="my-4 container text-center">
            <h1>Declined Permit Jobs</h1>
            <Table data = {jobList}></Table>
        </div>
    )
}