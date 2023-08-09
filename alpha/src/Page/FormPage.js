import {createJob} from '../Components/APICalls'


function onSubmit(){
    const newJob = {
        customer: document.getElementById('customerName').value,
        status: 'New',
        email: document.getElementById('email').value,
        po_number: document.getElementById('poNumber').value,
        wo_number: document.getElementById('woNumber').value,
        setup: document.getElementById('location').value,
        }
    createJob(newJob)
}

export default function formPage(){
    return(
        <div className="container text-center">
            <h1>Create a new form</h1>
            <form>     
            <div class="form-group">
                <label for="customerName">Name</label>
                <input type="text" class="form-control" id="customerName" placeholder="Enter name"/>
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="text" class="form-control" id="email" placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="poNumber">PO Number</label>
                <input type="text" class="form-control" id="poNumber" placeholder="Enter PO Number (Optional)"/>
            </div>
            <div class="form-group">
                <label for="woNumber">WO Number</label>
                <input type="text" class="form-control" id="woNumber" placeholder="Enter WO Number (Optional)"/>
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" class="form-control" id="location" placeholder="Enter Location"/>
            </div>
                <button type="button" class="btn btn-primary" onClick={()=> {onSubmit()}}>Submit</button>
            </form>
        </div>
    )
}