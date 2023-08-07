import {createJob, getAllJobs, deleteJob, getSpecificJobs} from '../Components/APICalls'

//FYI if this id is already in DB than it can't make it
const createJobExample = {
  id: 36,
  customer: 'customer',
  status: 'completed'
  //other properties can be added this way except for date
  //date needs to have a date object type instead of string...
  //for that it depends on how the minsu is gonna setup form i guess lolol
}

const deleteExample = {id: 36}
const getSpecificJobExample = {customer:'doowon'}

export default function HomePage() {
  return (
    <div>
      <header className='container text-center my-4'>
        <h1>Welcome</h1>
        <button onClick={()=>createJob(createJobExample)}>Add Job</button>
        <button onClick={()=>getAllJobs()}>Get Jobs</button>
        <button onClick={()=>deleteJob(deleteExample)}>Delete Job</button>
        <button onClick={()=>getSpecificJobs(getSpecificJobExample)}>specific Job</button>
      </header>
    </div>
  );
}