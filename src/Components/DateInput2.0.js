import { useState } from "react";
import CustomTimePicker from "./CustomTimePicker";
import { InputLabel, MenuItem, Select } from "@mui/material";

export default function DateInput2({ index ,deleteDate, handleDateChange, handleCheckboxChanges }) {
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [showExWeekend, setShowExWeekend] = useState(false);


  const handleButtonOptions = (selected) => {
    if(selected.value == "one"){
      handleOneDaySelected()
    }
    else if(selected.value == "twentyFour"){
      handleCheckboxChange(false)
      handleCheckboxChanges(index, 'twentyFour', selected.checked)
    }
    else if(selected.value == "repeat"){
      handleCheckboxChange(true)
      handleCheckboxChanges(index, 'repeat', selected.checked)
    }
  }

  const handleCheckboxChange = (showExcludeWeekend) => {
    setShowExWeekend(showExcludeWeekend)
    setShowAdditionalInput(true);
  };

  const handleOneDaySelected = () => {
    setShowExWeekend(false)
    setShowAdditionalInput(false)
  }

    return (
      <div className="d-flex align-items-center">
        {showAdditionalInput ? <label>Start Date</label> : <label>Date</label>}
        <input
          type="date"
          className="form-control mx-2 w-auto w-md-100" // Adjusted width
          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'startDate', e.target.value)}
          required
          />
          
        <label className="mx-2">Start Time</label>
        <CustomTimePicker onChange={(selectedTime) => handleDateChange(index, 'startTime', selectedTime)} defaultTime={9} defaultPM={false}/>
      {showAdditionalInput && (
        <>
        <label>End Date</label>
        <input
          type="date"
          className="form-control mx-2"
          style={{ width: '200px' }}
          onChange={(e) => handleDateChange(index, 'endDate', e.target.value)}
          required
          />
        </>
      )}

      <label className="mx-2">End Time</label>
      <CustomTimePicker onChange={(selectedTime) => handleDateChange(index, 'endTime', selectedTime)} defaultTime={3} defaultPM={true}/>
  
      <select className="form-select mx-3" style={{ width: '120px' }} onChange={(e) => handleButtonOptions(e.target)}>
        <option value="one">One Day</option>
        <option value="repeat">Repeat</option>
        <option value="twentyFour">24/7</option>
      </select>

      
      {showExWeekend && (
        <>
          <input className="form-check-input mx-2" type="checkbox" value="" onChange={(e) => {
            handleCheckboxChanges(index, 'exWeekend', e.target.checked);}}/>
          <label className="form-check-label" htmlFor="flexCheckDefault"> Exclude Weekends</label>
        </>
      )}
        {index === 0 ? null : (
          <button type="button" className="btn btn-primary my-2 mx-2" onClick={() => deleteDate(index)}>
            X
          </button>
        )}
      </div>
    );
  }