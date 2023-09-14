import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Link } from "react-router-dom";
import { DateRangePicker } from 'react-dates';
import {createJob, getSpecificJobs} from '../Components/APICalls'

class formPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        }
    }

    onSubmit = () => {
        const newJob = {
            customer: document.getElementById('customerName').value,
            status: 'New',
            email: document.getElementById('email').value,
            po_number: document.getElementById('poNumber').value,
            wo_number: document.getElementById('woNumber').value,
            setup: document.getElementById('location').value,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }
        createJob(newJob)
    }

    onSubmitList = () => {
        const {differenceInDays, addDays } = require("date-fns");
        var result = 0;
        result = differenceInDays(
            new Date(this.state.endDate),
            new Date(this.state.startDate),
        ) + 1;
        var arr = [];
        arr.length = result;
        var currentDay = new Date(this.state.startDate);
        for (let i = 0; i <result; i ++){
            arr[i] = currentDay.toString();
            currentDay = addDays(currentDay, 1)
        }
        console.log(arr)
        return arr
    }

render(){
    return(
        <div className="container text-center">
            <h1>Create a new form</h1>
            <form>     
            <div className="mb-3">
                <label htmlFor="customerName">Name</label>
                <input type="text" className="form-control" id="customerName" placeholder="Enter name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email address</label>
                <input type="text" className="form-control" id="email" placeholder="Enter email"/>
            </div>
            <div className="mb-3">
                <label htmlFor="poNumber">PO Number</label>
                <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)"/>
            </div>
            <div className="mb-3">
                <label htmlFor="woNumber">WO Number</label>
                <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)"/>
            </div>
            <div className="mb-3">
                <label htmlFor="location">Location</label>
                <input type="text" className="form-control" id="location" placeholder="Enter Location"/>
            </div>
            <div className="mb-3">
                <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
            <Link to="/time" state={{data: this.onSubmit.newJob}}>
                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </Link>
            </form>
        </div>
    );
}

}

export default formPage;