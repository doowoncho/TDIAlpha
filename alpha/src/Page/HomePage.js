import {createJob, deleteJob, updateJob} from '../Components/APICalls'

const createJobExample = {
  customer: 'customer',
  status: 'completed'
  //other properties can be added this way except for date
  //date needs to have a date object type instead of string...
  //for that it depends on how the minsu is gonna setup form i guess lolol
}
const updateJobExample = {status:'Declined'}

export default function HomePage() {
  return (
    <div>
      <header className='container text-center my-4'>
        <h1>Welcome</h1>
        <button onClick={()=>createJob(createJobExample)}>Add Job</button>
        <button onClick={()=>deleteJob(68)}>Delete Job</button>
        <button onClick={()=>updateJob(36, updateJobExample)}>Update Job</button>
      </header>
    </div>
  );
}